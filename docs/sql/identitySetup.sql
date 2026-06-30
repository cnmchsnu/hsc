insert into identity.roles (
    name,
    type,
    description
)
values
(
    'customer',
    'system',
    'Default customer'
),
(
    'staff',
    'system',
    'School staff'
),
(
    'admin',
    'system',
    'System administrator'
);

insert into identity.permissions (
    key,
    description
)
values
(
    'product.read',
    'View products'
),
(
    'product.manage',
    'Manage products'
),
(
    'order.read',
    'View orders'
),
(
    'order.manage',
    'Manage orders'
),
(
    'inventory.adjust',
    'Adjust inventory'
),
(
    'campaign.manage',
    'Manage campaigns'
),
(
    'user.manage',
    'Manage users'
);

insert into identity.role_permissions (
    role_id,
    permission_id
)
select
    r.id,
    p.id
from identity.roles r
join identity.permissions p
    on p.key in (
        'product.read',
        'order.read'
    )
where r.name = 'customer';

insert into identity.role_permissions (
    role_id,
    permission_id
)
select
    r.id,
    p.id
from identity.roles r
join identity.permissions p
    on p.key in (
        'product.read',
        'order.read',
        'order.manage',
        'inventory.adjust'
    )
where r.name = 'staff';

create or replace function identity.get_authorization(
    p_user_id uuid
)
returns jsonb
language sql
stable
security definer
set search_path = identity
as
$$

select jsonb_build_object(

    'roles',

    (
        select coalesce(
            jsonb_agg(distinct r.name),
            '[]'::jsonb
        )
        from identity.user_roles ur
        join identity.roles r
            on r.id = ur.role_id
        where ur.user_id = p_user_id
    ),

    'permissions',

    (
        select coalesce(
            jsonb_agg(distinct p.key),
            '[]'::jsonb
        )
        from identity.user_roles ur
        join identity.role_permissions rp
            on rp.role_id = ur.role_id
        join identity.permissions p
            on p.id = rp.permission_id
        where ur.user_id = p_user_id
    )

);

$$;

grant execute
on function identity.get_authorization(uuid)
to authenticated;