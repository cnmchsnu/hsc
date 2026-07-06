create or replace function identity.identity_get_user_permissions(
    p_user_id uuid
)
returns table (
    permission_key text
)
language sql
stable
as
$$

select distinct
    p.key
from identity.user_roles ur
join identity.role_permissions rp
    on rp.role_id = ur.role_id
join identity.permissions p
    on p.id = rp.permission_id
where ur.user_id = p_user_id;

$$;

create or replace function identity.has_permission(
    p_permission text
)
returns boolean
language sql
stable
security definer
set search_path = identity
as $$
    select exists (
        select 1
        from identity.user_roles ur
        join identity.role_permissions rp
            on rp.role_id = ur.role_id
        join identity.permissions p
            on p.id = rp.permission_id
        where ur.user_id = auth.uid()
          and p.key = p_permission
    );
$$;

create or replace function identity.has_role(
    p_role text
)
returns boolean
language sql
stable
security definer
set search_path = identity, auth
as $$
    select exists (
        select 1
        from identity.user_roles ur
        join identity.roles r
            on r.id = ur.role_id
        where ur.user_id = auth.uid()
          and r.name = p_role
    );
$$;

grant execute
on function identity.has_role(text)
to authenticated;

grant execute
on function identity.has_role(text)
to anon;


create or replace function commerce.get_category_path(
    p_category_id uuid
)
returns table (

    id uuid,

    parent_id uuid,

    name text,

    slug text,

    description text,

    display_order integer,

    status text,

    created_at timestamptz,

    updated_at timestamptz

)
language sql
stable
security invoker
as
$$

with recursive path as (

    select
        c.*,
        0 as depth
    from commerce.categories c
    where c.id = p_category_id

    union all

    select
        parent.*,
        path.depth + 1
    from commerce.categories parent
    join path
        on parent.id = path.parent_id

)

select
    id,
    parent_id,
    name,
    slug,
    description,
    display_order,
    status,
    created_at,
    updated_at
from path
order by depth desc;
$$

CREATE OR REPLACE FUNCTION commerce.update_products(
    products jsonb
)
RETURNS TABLE (

    id uuid,

    success boolean,

    reason text,

    version bigint

)
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN

RETURN QUERY

WITH updated AS (

    UPDATE commerce.products AS p

    SET

        slug = u.slug,

        name = u.name,

        description = u.description,

        price = u.price,

        status = u.status,

        version = p.version + 1,

        updated_at = now()

    FROM jsonb_to_recordset(products) AS u(

        id uuid,

        version bigint,

        slug text,

        name text,

        description text,

        price numeric,

        status text

    )

    WHERE

        p.id = u.id

        AND p.version = u.version

    RETURNING

        p.id,

        p.version

)

SELECT

    u.id,

    updated.id IS NOT NULL,

    CASE

        WHEN updated.id IS NULL THEN 'VERSION_CONFLICT'

        ELSE NULL

    END,

    COALESCE(updated.version, u.version)

FROM jsonb_to_recordset(products) AS u(

    id uuid,

    version bigint,

    slug text,

    name text,

    description text,

    price numeric,

    status text

)

LEFT JOIN updated

ON updated.id = u.id;

END;
$$;

CREATE OR REPLACE FUNCTION commerce.update_product_images(
    product_images jsonb
)
RETURNS TABLE (

    id uuid,

    success boolean,

    reason text,

    version bigint

)
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN

RETURN QUERY

WITH updated AS (

    UPDATE commerce.product_images AS p

    SET

        product_id = u.product_id,

        storage_path = u.storage_path,

        display_order = u.display_order,

        is_primary = u.is_primary,

        status = u.status,

        version = p.version + 1,

        updated_at = now()

    FROM jsonb_to_recordset(product_images) AS u(

        id uuid,

        version bigint,

        product_id uuid,

        storage_path text,

        display_order integer,

        is_primary boolean,

        status text

    )

    WHERE

        p.id = u.id

        AND p.version = u.version

    RETURNING

        p.id,

        p.version

)

SELECT

    u.id,

    updated.id IS NOT NULL,

    CASE

        WHEN updated.id IS NULL THEN 'VERSION_CONFLICT'

        ELSE NULL

    END,

    COALESCE(updated.version, u.version)

FROM jsonb_to_recordset(product_images) AS u(

    id uuid,

    version bigint,

    product_id uuid,

    storage_path text,

    display_order integer,

    is_primary boolean,

    status text

)

LEFT JOIN updated

ON updated.id = u.id;

END;
$$;

CREATE OR REPLACE FUNCTION commerce.update_product_categories(
    product_categories jsonb
)
RETURNS TABLE (

    id uuid,

    success boolean,

    reason text,

    version bigint

)
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN

RETURN QUERY

WITH updated AS (

    UPDATE commerce.product_categories AS p

    SET

        product_id = u.product_id,

        category_id = u.category_id,

        display_order = u.display_order,

        is_primary = u.is_primary,

        version = p.version + 1,

        updated_at = now()

    FROM jsonb_to_recordset(product_categories) AS u(

        id uuid,

        version bigint,

        product_id uuid,

        category_id uuid,

        display_order integer,

        is_primary boolean

    )

    WHERE

        p.id = u.id

        AND p.version = u.version

    RETURNING

        p.id,

        p.version

)

SELECT

    u.id,

    updated.id IS NOT NULL,

    CASE

        WHEN updated.id IS NULL THEN 'VERSION_CONFLICT'

        ELSE NULL

    END,

    COALESCE(updated.version, u.version)

FROM jsonb_to_recordset(product_categories) AS u(

    id uuid,

    version bigint,

    product_id uuid,

    category_id uuid,

    display_order integer,

    is_primary boolean

)

LEFT JOIN updated

ON updated.id = u.id;

END;
$$;


CREATE OR REPLACE FUNCTION commerce.update_categories(
    categories jsonb
)
RETURNS TABLE (

    id uuid,

    success boolean,

    reason text,

    version bigint

)
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN

RETURN QUERY

WITH updated AS (

    UPDATE commerce.categories AS p

    SET

        partent_id = u.parent_id,    

        slug = u.slug,

        name = u.name,

        description = u.description,

        display_order = u.display_order,

        status = u.status,

        version = p.version + 1,

        updated_at = now()

    FROM jsonb_to_recordset(categories) AS u(

        id uuid,

        version bigint,

        parent_id uuid,

        slug text,

        name text,

        description text,

        display_order integer,

        status text

    )

    WHERE

        p.id = u.id

        AND p.version = u.version

    RETURNING

        p.id,

        p.version

)

SELECT

    u.id,

    updated.id IS NOT NULL,

    CASE

        WHEN updated.id IS NULL THEN 'VERSION_CONFLICT'

        ELSE NULL

    END,

    COALESCE(updated.version, u.version)

FROM jsonb_to_recordset(categories) AS u(

    id uuid,

    version bigint,

    parent_id uuid,

    slug text,

    name text,

    description text,

    display_order integer,

    status text

)

LEFT JOIN updated

ON updated.id = u.id;

END;
$$;