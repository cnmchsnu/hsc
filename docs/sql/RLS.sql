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

CREATE POLICY "Users can read own profile"
ON identity.user_profiles
FOR SELECT
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can insert own profile"
ON identity.user_profiles
FOR INSERT
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own profile"
ON identity.user_profiles
FOR UPDATE
USING (
    auth.uid() = user_id
);




create policy "Public can read active products"
on commerce.products
for select
using (
    status = 'active'
);

create policy "Public can read product images"
on commerce.product_images
for select
using (
    exists (
        select 1
        from commerce.products p
        where p.id = product_images.product_id
        and p.status = 'active'
    )
);

create policy "Public can read categories"
on commerce.categories
for select
using (
    true
);

create policy "Public can read product category mappings"

on commerce.product_categories

for select

to anon, authenticated

using (

    exists (

        select 1

        from commerce.products p

        where p.id = product_categories.product_id

          and p.status = 'active'

    )

    and

    exists (

        select 1

        from commerce.categories c

        where c.id = product_categories.category_id

          and c.status = 'active'

    )

);


CREATE POLICY "Users can read own cart"
ON commerce.carts
FOR SELECT
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can insert own cart"
ON commerce.carts
FOR INSERT
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own cart"
ON commerce.carts
FOR UPDATE
USING (
    auth.uid() = user_id
);


create policy "Public can read product categories"
on commerce.product_categories
for select
using (
    exists (
        select 1
        from commerce.products p
        where p.id = product_categories.product_id
          and p.status = 'active'
    )
);

CREATE POLICY SKU_READ
ON commerce.skus
FOR SELECT
TO AUTHENTICATED
USING (TRUE);

CREATE POLICY INVENTORY_READ
ON inventory.inventory_items
FOR SELECT
TO AUTHENTICATED
USING (TRUE);

CREATE POLICY PRICE_READ
ON pricing.prices
FOR SELECT
TO AUTHENTICATED
USING (TRUE);



CREATE POLICY variant_options_select
ON commerce.variant_options
FOR SELECT
TO authenticated
USING (TRUE);



CREATE POLICY variant_option_values_select
ON commerce.variant_option_values
FOR SELECT
TO authenticated
USING (TRUE);


CREATE POLICY sku_variant_values_select
ON commerce.sku_variant_values
FOR SELECT
TO authenticated
USING (TRUE);


create policy "Public can read active pricings"
on pricing.prices
for select
using (
    true
);