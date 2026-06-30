insert into identity.user_roles (
    user_id,
    role_id
)


--------------------------------


select
    '你的-user-id'::uuid,
    id
from identity.roles
where name = 'admin';

select
    u.email,
    r.name
from identity.user_roles ur
join auth.users u
    on u.id = ur.user_id
join identity.roles r
    on r.id = ur.role_id;

select
    u.email,
    p.key
from identity.user_roles ur
join auth.users u
    on u.id = ur.user_id
join identity.role_permissions rp
    on rp.role_id = ur.role_id
join identity.permissions p
    on p.id = rp.permission_id
order by p.key;