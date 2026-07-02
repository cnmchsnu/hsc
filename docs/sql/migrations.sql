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