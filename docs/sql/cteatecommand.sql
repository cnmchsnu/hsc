CREATE SCHEMA IF NOT EXISTS identity;

CREATE TABLE identity.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    display_name TEXT,
    student_id TEXT UNIQUE,

    class TEXT,
    number TEXT,

    auto_classification TEXT NOT NULL,
    manual_override TEXT,

    final_classification TEXT GENERATED ALWAYS AS (
        COALESCE(manual_override, auto_classification)
    ) STORED,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version BIGINT NOT NULL DEFAULT 1
);

CREATE TABLE identity.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,
    scope TEXT NOT NULL,
    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE identity.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    KEY TEXT NOT NULL UNIQUE,
    description TEXT,
    scope TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE identity.role_permissions (
    role_id UUID NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES identity.permissions(id) ON DELETE CASCADE,

    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE identity.user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE,

    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE identity.user_pREFERENCES (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    language TEXT DEFAULT 'zh-TW',
    theme TEXT DEFAULT 'system',
    timezone TEXT DEFAULT 'Asia/Taipei',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE SCHEMA IF NOT EXISTS commerce;

CREATE TABLE commerce.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,
    description TEXT,

    status TEXT NOT NULL,

    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commerce.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    slug TEXT NOT NULL UNIQUE

    name TEXT NOT NULL,
    description TEXT,

    status TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version BIGINT NOT NULL DEFAULT 1
);

create index idx_products_category_id
on commerce.products(category_id);

create index idx_products_status
on commerce.products(status);

create UNIQUE index idx_products_slug
on commerce.products(slug);

CREATE TABLE commerce.campaign_products (
    campaign_id UUID NOT NULL REFERENCES commerce.campaigns(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES commerce.products(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY (campaign_id, product_id)
);

CREATE TABLE commerce.campaign_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    campaign_id UUID NOT NULL REFERENCES commerce.campaigns(id) ON DELETE CASCADE,

    storage_path TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commerce.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL REFERENCES commerce.products(id) ON DELETE CASCADE,

    storage_path TEXT NOT NULL,

    is_PRIMARY BOOLEAN NOT NULL DEFAULT false,

    display_order INTEGER NOT NULL DEFAULT 0,

    alt TEXT NOT NULL DEFAULT '',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    version BIGINT NOT NULL DEFAULT 1
);

create index idx_product_images_product_id
on commerce.product_images(product_id);

create index idx_product_images_is_primary
on commerce.product_images(product_id, is_PRIMARY);

CREATE TABLE commerce.product_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID REFERENCES commerce.products(id),

    name TEXT NOT NULL,

    price INTEGER NOT NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

create table commerce.categories (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    parent_id uuid REFERENCES commerce.categories(id) on delete set NULL,

    name TEXT NOT NULL,

    slug TEXT NOT NULL UNIQUE,

    description TEXT,

    display_order integer NOT NULL DEFAULT 0,

    status TEXT NOT NULL DEFAULT 'active',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version BIGINT NOT NULL DEFAULT 1,

    constraint categories_status_check
        check (
            status in (
                'active',
                'inactive'
            )
        )
);

create index idx_categories_parent_id
on commerce.categories(parent_id);

create index idx_categories_slug
on commerce.categories(slug);

create index idx_categories_status
on commerce.categories(status);

create index idx_categories_display_order
on commerce.categories(display_order);

create table commerce.product_categories (

    product_id uuid NOT NULL REFERENCES commerce.products(id) on delete cascade,

    category_id uuid NOT NULL REFERENCES commerce.categories(id) on delete cascade,

    is_PRIMARY boolean NOT NULL DEFAULT false,

    display_order integer NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version BIGINT NOT NULL DEFAULT 1,
    PRIMARY KEY (
        product_id,
        category_id
    )
);

create index idx_product_categories_category
on commerce.product_categories(category_id);

create index idx_product_categories_product
on commerce.product_categories(product_id);

CREATE TABLE commerce.skus (

    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),

    product_id UUID NOT NULL,

    code TEXT NOT NULL,

    barcode TEXT,

    status TEXT NOT NULL,

    version BIGINT NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_sku_product
        FOREIGN KEY (product_id)
        REFERENCES commerce.products(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_sku_code
        UNIQUE (code)

);

create index idx_sku_product

on commerce.skus(product_id);

create unique index idx_sku_code

on commerce.skus(code);

CREATE TABLE commerce.variant_options (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL
        REFERENCES commerce.products(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    is_enabled BOOLEAN NOT NULL DEFAULT true,

    display_name TEXT NOT NULL,

    sort_order INTEGER NOT NULL DEFAULT 0,

    version INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_variant_option_name
        UNIQUE (product_id, name)

);

CREATE INDEX idx_variant_options_product
ON commerce.variant_options(product_id);

CREATE TABLE commerce.variant_option_values (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    option_id UUID NOT NULL
        REFERENCES commerce.variant_options(id)
        ON DELETE CASCADE,

    value TEXT NOT NULL,

    is_enabled BOOLEAN NOT NULL DEFAULT true,

    display_value TEXT NOT NULL,

    sort_order INTEGER NOT NULL DEFAULT 0,

    version INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_variant_option_value
        UNIQUE (option_id, value)

);

CREATE INDEX idx_variant_option_values_option
ON commerce.variant_option_values(option_id);

CREATE TABLE commerce.sku_variant_values (

    sku_id UUID NOT NULL
        REFERENCES commerce.skus(id)
        ON DELETE CASCADE,

    option_value_id UUID NOT NULL
        REFERENCES commerce.variant_option_values(id)
        ON DELETE CASCADE,

    PRIMARY KEY (
        sku_id,
        option_value_id
    )

    CONSTRAINT fk_sku_variant_values_sku
        FOREIGN KEY (sku_id)
        REFERENCES commerce.skus(id)
        ON DELETE CASCADE

    CONSTRAINT fk_sku_variant_values_option_value
        FOREIGN KEY (option_value_id)
        REFERENCES commerce.variant_option_values(id)
        ON DELETE CASCADE



);

CREATE INDEX idx_sku_variant_values_sku
ON commerce.sku_variant_values(sku_id);

CREATE INDEX idx_sku_variant_values_option_value
ON commerce.sku_variant_values(option_value_id);

CREATE TABLE commerce.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES auth.users(id),

    mode TEXT NOT NULL DEFAULT 'strict',

    campaign_id UUID REFERENCES commerce.campaigns(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commerce.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    cart_id UUID NOT NULL REFERENCES commerce.carts(id) ON DELETE CASCADE,

    product_id UUID NOT NULL REFERENCES commerce.products(id),

    campaign_id UUID NOT NULL REFERENCES commerce.campaigns(id),

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commerce.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES auth.users(id),

    campaign_id UUID NOT NULL REFERENCES commerce.campaigns(id),

    status TEXT NOT NULL,

    total_amount INTEGER NOT NULL CHECK (total_amount >= 0),

    currency TEXT NOT NULL DEFAULT 'TWD',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commerce.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE,

    product_id UUID NOT NULL REFERENCES commerce.products(id),

    product_snapshot_id UUID NOT NULL REFERENCES commerce.product_snapshots(id),

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    unit_price INTEGER NOT NULL CHECK (unit_price >= 0),

    subtotal INTEGER NOT NULL CHECK (subtotal >= 0)
);

CREATE TABLE commerce.order_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE,

    data JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE commerce.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES commerce.orders(id),

    amount INTEGER NOT NULL CHECK (amount >= 0),

    method TEXT NOT NULL,

    status TEXT NOT NULL,

    confirmed_by UUID REFERENCES auth.users(id),

    confirmed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SCHEMA IF NOT EXISTS inventory;

CREATE TABLE inventory.inventory_items (

    id UUID DEFAULT gen_random_uuid(),

    sku_id UUID PRIMARY KEY,

    available_quantity INTEGER NOT NULL DEFAULT 0,

    reserved_quantity INTEGER NOT NULL DEFAULT 0,

    incoming_quantity INTEGER NOT NULL DEFAULT 0,

    version BIGINT NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT FK_INVENTORY_SKU
        FOREIGN KEY (sku_id)
        REFERENCES commerce.skus(id)
        ON DELETE CASCADE

);

create index idx_inventory_items_sku_id
on inventory.inventory_items(sku_id);

CREATE SCHEMA IF NOT EXISTS pricing;

CREATE TABLE pricing.prices (

    id UUID KEY DEFAULT GEN_RANDOM_UUID(),

    sku_id UUID NOT NULL,

    currency TEXT NOT NULL,

    amount BIGINT NOT NULL,

    compare_at BIGINT,

    cost BIGINT,

    effective_from TIMESTAMPTZ,

    effective_to TIMESTAMPTZ,

    version BIGINT NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT FK_PRICE_SKU
        FOREIGN KEY (sku_id)
        REFERENCES commerce.skus(id)
        ON DELETE CASCADE

    
    PRIMARY KEY (
        sku_id,
        id
    )

);

CREATE INDEX idx_prices_sku
ON pricing.prices(sku_id);

CREATE INDEX idx_prices_effective
ON pricing.prices(effective_from, effective_to);

CREATE SCHEMA IF NOT EXISTS fulfillment;

CREATE TABLE fulfillment.inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL REFERENCES commerce.products(id),

    type TEXT NOT NULL CHECK (
        type IN (
            'reserve',
            'release',
            'deduct',
            'adjust'
        )
    ),

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    reference_type TEXT NOT NULL CHECK (
        reference_type IN (
            'order',
            'batch',
            'admin'
        )
    ),

    reference_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inventory_transactions_product
ON fulfillment.inventory_transactions(product_id);

CREATE INDEX idx_inventory_transactions_reference
ON fulfillment.inventory_transactions(reference_type, reference_id);

CREATE TABLE fulfillment.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    campaign_id UUID NOT NULL REFERENCES commerce.campaigns(id),

    name TEXT NOT NULL,

    status TEXT NOT NULL CHECK (
        status IN (
            'draft',
            'packing',
            'shipped',
            'completed'
        )
    ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_batches_campaign
ON fulfillment.batches(campaign_id);

CREATE INDEX idx_batches_status
ON fulfillment.batches(status);

CREATE TABLE fulfillment.batch_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_id UUID NOT NULL
        REFERENCES fulfillment.batches(id)
        ON DELETE CASCADE,

    order_id UUID NOT NULL
        REFERENCES commerce.orders(id),

    user_id UUID NOT NULL
        REFERENCES auth.users(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_batch_items_order UNIQUE(order_id)
);

CREATE INDEX idx_batch_items_batch
ON fulfillment.batch_items(batch_id);

CREATE INDEX idx_batch_items_user
ON fulfillment.batch_items(user_id);

CREATE INDEX idx_batch_items_order
ON fulfillment.batch_items(order_id);


CREATE SCHEMA IF NOT EXISTS system;

CREATE TABLE system.NOTifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    type TEXT NOT NULL,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    status TEXT NOT NULL
        CHECK (
            status IN (
                'unread',
                'read'
            )
        ),

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    read_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_NOTifications_user
ON system.NOTifications(user_id);

CREATE INDEX idx_NOTifications_status
ON system.NOTifications(status);

CREATE INDEX idx_NOTifications_created_at
ON system.NOTifications(created_at DESC);

-- MVP Optional
CREATE TABLE system.files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    bucket TEXT NOT NULL,

    path TEXT NOT NULL,

    filename TEXT NOT NULL,

    mime_type TEXT NOT NULL,

    size BIGINT NOT NULL CHECK (size >= 0),

    uploaded_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_files_bucket
ON system.files(bucket);

CREATE INDEX idx_files_uploaded_by
ON system.files(uploaded_by);

CREATE UNIQUE INDEX uq_files_bucket_path
ON system.files(bucket, path);

-- MVP Optional
CREATE TABLE system.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    target_type TEXT NOT NULL
        CHECK (
            target_type IN (
                'product',
                'campaign',
                'order',
                'form'
            )
        ),

    action TEXT NOT NULL
        CHECK (
            action IN (
                'allow',
                'deny',
                'transform'
            )
        ),

    condition JSONB NOT NULL DEFAULT '{}'::jsonb,

    effect JSONB NOT NULL DEFAULT '{}'::jsonb,

    priority INTEGER NOT NULL DEFAULT 0,

    enabled BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_policies_target
ON system.policies(target_type);

CREATE INDEX idx_policies_enabled
ON system.policies(enabled);

CREATE INDEX idx_policies_priority
ON system.policies(priority DESC);

-- MVP Optional
CREATE TABLE system.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    KEY TEXT NOT NULL UNIQUE,

    value JSONB NOT NULL DEFAULT '{}'::jsonb,

    description TEXT,

    updated_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settings_KEY
ON system.settings(KEY);

CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE audit.order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL
        REFERENCES commerce.orders(id)
        ON DELETE CASCADE,

    event TEXT NOT NULL,

    performed_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_events_order
ON audit.order_events(order_id);

CREATE INDEX idx_order_events_created
ON audit.order_events(created_at DESC);

CREATE TABLE audit.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payment_id UUID NOT NULL
        REFERENCES commerce.payments(id)
        ON DELETE CASCADE,

    event TEXT NOT NULL,

    performed_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_events_payment
ON audit.payment_events(payment_id);

CREATE INDEX idx_payment_events_created
ON audit.payment_events(created_at DESC);

CREATE TABLE audit.system_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    type TEXT NOT NULL,

    source TEXT NOT NULL,

    payload JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_system_events_type
ON audit.system_events(type);

CREATE INDEX idx_system_events_created
ON audit.system_events(created_at DESC);

-- MVP Optional
CREATE TABLE audit.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    resource_type TEXT NOT NULL,

    resource_id UUID,

    action TEXT NOT NULL,

    before_data JSONB,

    after_data JSONB,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_user
ON audit.audit_logs(user_id);

CREATE INDEX idx_audit_logs_resource
ON audit.audit_logs(resource_type, resource_id);

CREATE INDEX idx_audit_logs_created
ON audit.audit_logs(created_at DESC);

-- MVP Optional
CREATE TABLE audit.login_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    provider TEXT NOT NULL,

    success BOOLEAN NOT NULL,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_login_logs_user
ON audit.login_logs(user_id);

CREATE INDEX idx_login_logs_created
ON audit.login_logs(created_at DESC);

-- MVP Optional
CREATE TABLE audit.api_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    request_id UUID NOT NULL DEFAULT gen_random_uuid(),

    method TEXT NOT NULL,

    path TEXT NOT NULL,

    status_code INTEGER NOT NULL,

    duration_ms INTEGER CHECK (duration_ms >= 0),

    user_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_logs_user
ON audit.api_logs(user_id);

CREATE INDEX idx_api_logs_path
ON audit.api_logs(path);

CREATE INDEX idx_api_logs_created
ON audit.api_logs(created_at DESC);