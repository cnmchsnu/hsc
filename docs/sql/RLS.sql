ALTER TABLE identity.user_profiles ENABLE ROW LEVEL SECURITY;

alter table commerce.products
enable row level security;

alter table commerce.product_images
enable row level security;

alter table commerce.categories
enable row level security;

alter table commerce.product_categories
enable row level security;

alter table commerce.product_categories
enable row level security;

alter table commerce.product_categories
force row level security;

ALTER TABLE commerce.variant_options
ENABLE ROW LEVEL SECURITY;

ALTER TABLE commerce.variant_option_values
ENABLE ROW LEVEL SECURITY;

ALTER TABLE commerce.sku_variant_values
ENABLE ROW LEVEL SECURITY;

-------------------- User RLS --------------------

create policy "users can read own role"
on "identity.user_roles"
as PERMISSIVE
for SELECT
to authenticated
using (
    auth.uid() = user_id
);

create policy "users can read roles"
on "identity.roles"
as PERMISSIVE
for SELECT
to authenticated
using (
    true
);

CREATE POLICY "Users can read own profile"
ON identity.user_profiles
FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can insert own profile"
ON identity.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own profile"
ON identity.user_profiles
FOR UPDATE
TO authenticated
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can read own cart"
ON commerce.carts
FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can insert own cart"
ON commerce.carts
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own cart"
ON commerce.carts
FOR UPDATE
TO authenticated
USING (
    auth.uid() = user_id
);

-------------------- public RLS --------------------

create policy "Public can read active products"
on commerce.products
for select
to public
using (
    status = 'published'
);

create policy "Public can read active product images"
on commerce.product_images
for select
to public
using (
    exists (
        select 1
        from commerce.products p
        where p.id = product_images.product_id
        and p.status = 'published'
    )
);

create policy "Public can read active categories"
on commerce.categories
for select
to public
using (
    status = 'active'
);

create policy "Public can read active product category mappings"
on commerce.product_categories
for select
to public
using (
    exists (
        select 1
        from commerce.products p
        where p.id = product_categories.product_id
          and p.status = 'published'

    )
    and
    exists (
        select 1
        from commerce.categories c
        where c.id = product_categories.category_id
          and c.status = 'active'
    )
);

CREATE POLICY "Public can read enabled variant options"
ON commerce.variant_options
FOR SELECT
TO public
USING (is_enabled);



CREATE POLICY "Public can read enabled variant option values"
ON commerce.variant_option_values
FOR SELECT
TO public
USING (is_enabled);


CREATE POLICY "Public can read active skus"
ON commerce.skus
FOR SELECT
TO public
USING (
    status = 'active'
);



CREATE POLICY "Public can read enabled sku variant values"
ON commerce.sku_variant_values
FOR SELECT
TO public
USING (
    exists (
        select 1
        from commerce.skus p
        where p.id = sku_variant_values.sku_id
          and p.status = 'active'

    )
    and
    exists (
        select 1
        from commerce.variant_option_values c
        where c.id = sku_variant_values.option_value_id
          and c.is_enabled = true
    )
);

CREATE POLICY "Public can read enabled inventory items"
ON inventory.inventory_items
FOR SELECT
TO public
USING (
    exists (
        select 1
        from commerce.skus p
        where p.id = inventory_items.sku_id
        and p.status == 'active'
    )
);

CREATE POLICY "Public can read active pricings"
ON pricing.prices
FOR SELECT
TO public
USING (
    exists (
        select 1
        from commerce.skus p
        where p.id = prices.sku_id
        and p.status == 'active'
    )
    and
    (effective_from IS NULL OR effective_from <= NOW())
    AND
    (effective_to IS NULL OR effective_to > NOW())
);






-------------------- Staff RLS --------------------

create policy "Staff can read all products"
on commerce.products
for select
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create products"
on commerce.products
for insert
TO authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can update products not archived"
on commerce.products
for update
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    status in ('draft', 'ready', 'published')
);

create policy "Staff can delete archived product"
on commerce.products
for delete
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);


create policy "Staff can read product images"
on commerce.product_images
for select
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create product images"
on commerce.product_images
for insert
TO authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.products p
        where p.id = product_images.product_id
        and p.status != 'archived'
    )
);

create policy "Staff can update product images"
on commerce.product_images
for update
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.products p
        where p.id = product_images.product_id
        and p.status != 'archived'
    )
);

create policy "Staff can delete products' images"
on commerce.product_images
for delete
TO authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

--
create policy "Staff can read all categories"
on commerce.categories
for select
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create categories"
on commerce.categories
for insert
to authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can update categories"
on commerce.categories
for update
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    (status in ('active', 'inactive'))
);

create policy "Staff can delete inactive categories"
on commerce.categories
for delete
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Public can read all product category mappings"
on commerce.product_categories
for select
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create product category mappings"
on commerce.product_categories
for insert
to authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.products p
        where p.id = product_categories.product_id
        and p.status != 'archived'
    )
    and
    exists (
        select 1
        from commerce.categories c
        where c.id = product_categories.category_id
        and c.status != 'inactive'
    )
);

create policy "Staff can update product category mappings"
on commerce.product_categories
for update
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.products p
        where p.id = product_categories.product_id
        and p.status != 'archived'
    )
    and
    exists (
        select 1
        from commerce.categories c
        where c.id = product_categories.category_id
        and c.status != 'inactive'
    )
);


create policy "Staff can delete product category mappings"
on commerce.product_categories
for delete
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

--
CREATE POLICY "Staff can read all variant options"
ON commerce.variant_options
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create variant options"
on commerce.variant_options
for insert
to authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.products p
        where p.id = variant_options.product_id
        and p.status != 'archived'
    )
);

create policy "Staff can update variant options"
on commerce.variant_options
for update
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.products p
        where p.id = variant_options.product_id
        and p.status != 'archived'
    )
);

CREATE POLICY "Staff can read all variant option values"
ON commerce.variant_option_values
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

CREATE POLICY "Staff can create variant option values"
ON commerce.variant_option_values
FOR INSERT
TO authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.variant_options p
        where p.id = variant_option_values.option_id
        and p.is_enabled
    )
);

CREATE POLICY "Staff can update variant option values"
ON commerce.variant_option_values
FOR UPDATE
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.variant_options p
        where p.id = variant_option_values.option_id
        and p.is_enabled
    )
);

--

CREATE POLICY "Staff can read all skus"
ON commerce.skus
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);


create policy "Staff can create skus"
on commerce.skus
for insert
to authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.products p
        where p.id = skus.product_id
        and p.status != 'archived'
    )
);

create policy "Staff can update skus"
on commerce.skus
for update
to authenticated
using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.products p
        where p.id = skus.product_id
        and p.status != 'archived'
    )
);

Create policy "Staff can read all sku variant values"
ON commerce.sku_variant_values
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create sku variant values"
on commerce.sku_variant_values
for insert
to authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.skus p
        where p.id = sku_variant_values.sku_id
        and p.status != 'archived'
    )
);

Create policy "Staff can update sku variant values"
ON commerce.sku_variant_values
FOR UPDATE
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.skus p
        where p.id = sku_variant_values.sku_id
        and p.status != 'archived'
    )
);

Create policy "Staff can delete sku variant values"
ON commerce.sku_variant_values
FOR DELETE
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);




CREATE POLICY "Staff can read all inventory items"
ON inventory.inventory_items
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

Create policy "Staff can create inventory items"
ON inventory.inventory_items
FOR INSERT
TO authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.skus p
        where p.id = inventory_items.sku_id
        and p.status != 'archived'
    )
);

CREATE POLICY "Staff can update inventory items"
ON inventory.inventory_items
FOR UPDATE
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.skus p
        where p.id = inventory_items.sku_id
        and p.status != 'archived'
    )
);

Create policy "Staff can read all pricings"
ON pricing.prices
FOR SELECT
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
);

create policy "Staff can create pricings"
ON pricing.prices
FOR INSERT
TO authenticated
with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
    and
    exists (
        select 1
        from commerce.skus p
        where p.id = prices.sku_id
        and p.status != 'archived'
    )
);

Create policy "Staff can update pricings"
ON pricing.prices
FOR UPDATE
TO authenticated
USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff')
) with check (
    exists (
        select 1
        from commerce.skus p
        where p.id = prices.sku_id
        and p.status != 'archived'
    )
);