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