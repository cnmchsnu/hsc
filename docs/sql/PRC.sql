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