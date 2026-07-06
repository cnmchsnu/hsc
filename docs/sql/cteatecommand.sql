CREATE SCHEMA IF NOT EXISTS identity;

CREATE TABLE identity.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    display_name TEXT,
    student_id TEXT UNIQUE,

    auto_classification TEXT NOT NULL,
    manual_override TEXT,

    final_classification TEXT GENERATED ALWAYS AS (
        COALESCE(manual_override, auto_classification)
    ) STORED,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE identity.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE identity.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    key TEXT NOT NULL UNIQUE,
    description TEXT,

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

-- MVP Optional
CREATE TABLE identity.user_preferences (
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

    price INTEGER NOT NULL,

    currency TEXT NOT NULL DEFAULT 'TWD',

    compare_at_price INTEGER,

    stock_total INTEGER NOT NULL DEFAULT 0,
    stock_sold INTEGER NOT NULL DEFAULT 0,

    status TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version bigint NOT NULL DEFAULT 1
);

create index idx_products_category_id
on commerce.products(category_id);

create index idx_products_status
on commerce.products(status);

create unique index idx_products_slug
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

    is_primary BOOLEAN NOT NULL DEFAULT false,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version bigint NOT NULL DEFAULT 1
);

CREATE TABLE commerce.product_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID REFERENCES commerce.products(id),

    name TEXT NOT NULL,

    price INTEGER NOT NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

create table commerce.categories (

    id uuid primary key default gen_random_uuid(),

    parent_id uuid references commerce.categories(id) on delete set null,

    name text not null,

    slug text not null unique,

    description text,

    display_order integer not null default 0,

    status text not null default 'active',

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),
    version bigint NOT NULL DEFAULT 1,

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

create index idx_categories_status
on commerce.categories(status);

create index idx_categories_display_order
on commerce.categories(display_order);

create table commerce.product_categories (

    product_id uuid not null references commerce.products(id) on delete cascade,

    category_id uuid not null references commerce.categories(id) on delete cascade,

    is_primary boolean not null default false,

    display_order integer not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),
    version bigint NOT NULL DEFAULT 1,
    primary key (
        product_id,
        category_id
    )
);

create index idx_product_categories_category
on commerce.product_categories(category_id);

create index idx_product_categories_product
on commerce.product_categories(product_id);

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

CREATE TABLE system.notifications (
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

CREATE INDEX idx_notifications_user
ON system.notifications(user_id);

CREATE INDEX idx_notifications_status
ON system.notifications(status);

CREATE INDEX idx_notifications_created_at
ON system.notifications(created_at DESC);

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

    key TEXT NOT NULL UNIQUE,

    value JSONB NOT NULL DEFAULT '{}'::jsonb,

    description TEXT,

    updated_by UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settings_key
ON system.settings(key);

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