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


CREATE OR REPLACE FUNCTION commerce.delete_product_categories(
    product_categories jsonb
)
RETURNS TABLE (
    product_id uuid,
    category_id uuid,
    success boolean,
    reason text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN

RETURN QUERY

WITH deleted AS (
    DELETE FROM commerce.product_categories AS p
    USING jsonb_to_recordset(product_categories) AS u(
        product_id uuid,
        category_id uuid,
        is_primary boolean,
        display_order integer
    )
    WHERE
        p.product_id = u.product_id
        AND p.category_id = u.category_id
    RETURNING
        p.product_id,
        p.category_id
)

SELECT
    u.product_id,
    u.category_id,
    deleted.product_id IS NOT NULL AS success,
    CASE
        WHEN deleted.product_id IS NOT NULL THEN NULL
        ELSE 'NOT_FOUND'
    END AS reason
FROM jsonb_to_recordset(product_categories) AS u(
    product_id uuid,
    category_id uuid,
    is_primary boolean,
    display_order integer
)
LEFT JOIN deleted
  ON deleted.product_id = u.product_id
 AND deleted.category_id = u.category_id;

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


CREATE OR REPLACE FUNCTION COMMERCE.CREATE_SKUS(

    ITEMS JSONB

)

RETURNS SETOF COMMERCE.SKUS

LANGUAGE PLPGSQL

SECURITY DEFINER

AS $$

BEGIN

    RETURN QUERY

    INSERT INTO COMMERCE.SKUS (

        PRODUCT_ID,

        CODE,

        BARCODE,

        STATUS

    )

    SELECT

        X.PRODUCT_ID,

        X.CODE,

        X.BARCODE,

        X.STATUS

    FROM

        JSONB_TO_RECORDSET(ITEMS)

    AS X(

        PRODUCT_ID UUID,

        CODE TEXT,

        BARCODE TEXT,

        STATUS TEXT

    )

    RETURNING *;

END;

$$;

UPDATE

COMMERCE.SKUS

SET

CODE = X.CODE,

BARCODE = X.BARCODE,

STATUS = X.STATUS

FROM ...

WHERE

SKUS.ID = X.ID

AND SKUS.VERSION = X.VERSION

CREATE OR REPLACE FUNCTION INVENTORY.CREATE_INVENTORY_ITEMS(

    ITEMS JSONB

)

RETURNS SETOF INVENTORY.INVENTORY_ITEMS

LANGUAGE PLPGSQL

SECURITY DEFINER

SET SEARCH_PATH = INVENTORY

AS $$

BEGIN

    RETURN QUERY

    INSERT INTO INVENTORY.INVENTORY_ITEMS (

        SKU_ID,

        AVAILABLE_QUANTITY,

        RESERVED_QUANTITY,

        INCOMING_QUANTITY

    )

    SELECT

        X.SKU_ID,

        COALESCE(X.AVAILABLE_QUANTITY, 0),

        COALESCE(X.RESERVED_QUANTITY, 0),

        COALESCE(X.INCOMING_QUANTITY, 0)

    FROM

        JSONB_TO_RECORDSET(ITEMS)

    AS X(

        SKU_ID UUID,

        AVAILABLE_QUANTITY INTEGER,

        RESERVED_QUANTITY INTEGER,

        INCOMING_QUANTITY INTEGER

    )

    RETURNING *;

END;

$$;

CREATE OR REPLACE FUNCTION INVENTORY.UPDATE_INVENTORY_ITEMS(

    ITEMS JSONB

)

RETURNS SETOF INVENTORY.INVENTORY_ITEMS

LANGUAGE PLPGSQL

SECURITY DEFINER

SET SEARCH_PATH = INVENTORY

AS $$

BEGIN

    RETURN QUERY

    UPDATE INVENTORY.INVENTORY_ITEMS I

    SET

        AVAILABLE_QUANTITY = X.AVAILABLE_QUANTITY,

        RESERVED_QUANTITY = X.RESERVED_QUANTITY,

        INCOMING_QUANTITY = X.INCOMING_QUANTITY

    FROM

        JSONB_TO_RECORDSET(ITEMS)

    AS X(

        SKU_ID UUID,

        AVAILABLE_QUANTITY INTEGER,

        RESERVED_QUANTITY INTEGER,

        INCOMING_QUANTITY INTEGER,

        VERSION BIGINT

    )

    WHERE

        I.SKU_ID = X.SKU_ID

    AND

        I.VERSION = X.VERSION

    RETURNING I.*;

END;

$$;


CREATE OR REPLACE FUNCTION PRICING.CREATE_PRICES(

    ITEMS JSONB

)

RETURNS SETOF PRICING.PRICES

LANGUAGE PLPGSQL

SECURITY DEFINER

SET SEARCH_PATH = PRICING

AS $$

BEGIN

    RETURN QUERY

    INSERT INTO PRICING.PRICES (

        SKU_ID,

        CURRENCY,

        AMOUNT,

        COMPARE_AT,

        COST,

        EFFECTIVE_FROM,

        EFFECTIVE_TO

    )

    SELECT

        X.SKU_ID,

        X.CURRENCY,

        X.AMOUNT,

        X.COMPARE_AT,

        X.COST,

        X.EFFECTIVE_FROM,

        X.EFFECTIVE_TO

    FROM

        JSONB_TO_RECORDSET(ITEMS)

    AS X(

        SKU_ID UUID,

        CURRENCY TEXT,

        AMOUNT BIGINT,

        COMPARE_AT BIGINT,

        COST BIGINT,

        EFFECTIVE_FROM TIMESTAMPTZ,

        EFFECTIVE_TO TIMESTAMPTZ

    )

    RETURNING *;

END;

$$;

CREATE OR REPLACE FUNCTION PRICING.UPDATE_PRICES(

    ITEMS JSONB

)

RETURNS SETOF PRICING.PRICES

LANGUAGE PLPGSQL

SECURITY DEFINER

SET SEARCH_PATH = PRICING

AS $$

BEGIN

    RETURN QUERY

    UPDATE PRICING.PRICES P

    SET

        CURRENCY = X.CURRENCY,

        AMOUNT = X.AMOUNT,

        COMPARE_AT = X.COMPARE_AT,

        COST = X.COST,

        EFFECTIVE_FROM = X.EFFECTIVE_FROM,

        EFFECTIVE_TO = X.EFFECTIVE_TO

    FROM

        JSONB_TO_RECORDSET(ITEMS)

    AS X(

        ID UUID,

        CURRENCY TEXT,

        AMOUNT BIGINT,

        COMPARE_AT BIGINT,

        COST BIGINT,

        EFFECTIVE_FROM TIMESTAMPTZ,

        EFFECTIVE_TO TIMESTAMPTZ,

        VERSION BIGINT

    )

    WHERE

        P.ID = X.ID

    AND

        P.VERSION = X.VERSION

    RETURNING P.*;

END;

$$;


CREATE OR REPLACE FUNCTION commerce.create_variant_options(

    variants JSONB

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

BEGIN

    INSERT INTO commerce.variant_options (

        product_id,

        name,

        display_name,

        sort_order

    )

    SELECT

        (item->>'product_id')::UUID,

        item->>'name',

        item->>'display_name',

        COALESCE((item->>'sort_order')::INTEGER, 0)

    FROM jsonb_array_elements(variants) AS item;

END;

$$;

CREATE OR REPLACE FUNCTION commerce.update_variant_options(

    variants JSONB

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

DECLARE

    item JSONB;

BEGIN

    FOR item IN

        SELECT *

        FROM jsonb_array_elements(variants)

    LOOP

        UPDATE commerce.variant_options

        SET

            display_name = item->>'display_name',

            sort_order = COALESCE(

                (item->>'sort_order')::INTEGER,

                sort_order

            )

        WHERE id = (item->>'id')::UUID;

    END LOOP;

END;

$$;

CREATE OR REPLACE FUNCTION commerce.create_variant_option_values(

    values JSONB

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

BEGIN

    INSERT INTO commerce.variant_option_values (

        option_id,

        value,

        display_value,

        sort_order

    )

    SELECT

        (item->>'option_id')::UUID,

        item->>'value',

        item->>'display_value',

        COALESCE((item->>'sort_order')::INTEGER, 0)

    FROM jsonb_array_elements(values) AS item;

END;

$$;

CREATE OR REPLACE FUNCTION commerce.create_variant_option_values(

    value JSONB

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

BEGIN

    INSERT INTO commerce.variant_option_values (

        option_id,

        value,

        display_value,

        sort_order

    )

    SELECT

        (item->>'option_id')::UUID,

        item->>'value',

        item->>'display_value',

        COALESCE((item->>'sort_order')::INTEGER, 0)

    FROM jsonb_array_elements(values) AS item;

END;

$$;

CREATE OR REPLACE FUNCTION commerce.update_variant_option_values(

    value JSONB

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

DECLARE

    item JSONB;

BEGIN

    FOR item IN

        SELECT *

        FROM jsonb_array_elements(values)

    LOOP

        UPDATE commerce.variant_option_values

        SET

            display_value = item->>'display_value',

            sort_order = COALESCE(

                (item->>'sort_order')::INTEGER,

                sort_order

            )

        WHERE id = (item->>'id')::UUID;

    END LOOP;

END;

$$;


CREATE OR REPLACE FUNCTION commerce.replace_sku_variant_values(

    p_sku_id UUID,

    p_option_value_ids UUID[]

)

RETURNS VOID

LANGUAGE plpgsql

AS $$

DECLARE

    duplicate_count INTEGER;

BEGIN

    /*
     * Prevent selecting multiple values
     * from the same Variant Option.
     */

    SELECT COUNT(*)

    INTO duplicate_count

    FROM (

        SELECT

            option_id

        FROM commerce.variant_option_values

        WHERE id = ANY(p_option_value_ids)

        GROUP BY option_id

        HAVING COUNT(*) > 1

    ) t;

    IF duplicate_count > 0 THEN

        RAISE EXCEPTION

            'Duplicate variant option values are not allowed.';

    END IF;

    DELETE

    FROM commerce.sku_variant_values

    WHERE sku_id = p_sku_id;

    INSERT INTO commerce.sku_variant_values (

        sku_id,

        option_value_id

    )

    SELECT

        p_sku_id,

        unnest(p_option_value_ids);

END;

$$;

CREATE OR REPLACE FUNCTION commerce.get_product_variants(

    p_product_id UUID

)

RETURNS TABLE (

    option_id UUID,

    option_name TEXT,

    option_display_name TEXT,

    option_sort_order INTEGER,

    option_version INTEGER,

    value_id UUID,

    value_value TEXT,

    value_display_value TEXT,

    value_sort_order INTEGER,

    value_version INTEGER

)

LANGUAGE SQL

STABLE

AS $$

SELECT

    vo.id,

    vo.name,

    vo.display_name,

    vo.sort_order,

    vo.version,

    vv.id,

    vv.value,

    vv.display_value,

    vv.sort_order,

    vv.version

FROM commerce.variant_options vo

JOIN commerce.variant_option_values vv

ON vv.option_id = vo.id

WHERE vo.product_id = p_product_id

ORDER BY

    vo.sort_order,

    vv.sort_order,

    vo.display_name,

    vv.display_value;

$$;

CREATE OR REPLACE FUNCTION commerce.get_sku_variant_values(

    p_sku_id UUID

)

RETURNS TABLE (

    option_name TEXT,

    option_display_name TEXT,

    value TEXT,

    value_display_value TEXT

)

LANGUAGE SQL

STABLE

AS $$

SELECT

    vo.name,

    vo.display_name,

    vv.value,

    vv.display_value

FROM commerce.sku_variant_values sv

JOIN commerce.variant_option_values vv

ON vv.id = sv.option_value_id

JOIN commerce.variant_options vo

ON vo.id = vv.option_id

WHERE sv.sku_id = p_sku_id

ORDER BY

    vo.sort_order,

    vv.sort_order;

$$;

CREATE OR REPLACE FUNCTION commerce.get_product_sku_variants(

    p_product_id UUID

)

RETURNS TABLE (

    sku_id UUID,

    sku_code TEXT,

    option_id UUID,

    option_name TEXT,

    option_display_name TEXT,

    option_sort_order INTEGER,

    value_id UUID,

    value_value TEXT,

    value_display_value TEXT,

    value_sort_order INTEGER

)

LANGUAGE SQL

STABLE

AS $$

SELECT

    s.id,

    s.code,

    vo.id,

    vo.name,

    vo.display_name,

    vo.sort_order,

    vv.id,

    vv.value,

    vv.display_value,

    vv.sort_order

FROM commerce.skus s

JOIN commerce.sku_variant_values sv

ON sv.sku_id = s.id

JOIN commerce.variant_option_values vv

ON vv.id = sv.option_value_id

JOIN commerce.variant_options vo

ON vo.id = vv.option_id

WHERE s.product_id = p_product_id

ORDER BY

    s.code,

    vo.sort_order,

    vv.sort_order;

$$;