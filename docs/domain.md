很好，那我建議我們就不要再一個 Domain 一個 Domain 想了，而是直接建立 **Commerce Foundation Standard**，之後所有新的 Domain（SKU、Inventory、Pricing、Order、Coupon...）都依照同一套模板建立。

---

# Commerce Foundation v1

## Packages

```text
packages/

commerce/
    domain/
        product/
        category/
        sku/

inventory/
    domain/
        inventory-item/
        inventory-transaction/
        inventory-reservation/

pricing/
    domain/
        price/
        price-book/

database/
    entities/
        commerce/
        inventory/
        pricing/

infra/
    supabase/
        repositories/
            commerce/
            inventory/
            pricing/
```

---

# 每個 Aggregate 固定結構

例如 SKU

```text
sku/

    type.ts

    status.ts

    query.ts

    create.ts

    update.ts

    list.ts

    repository.ts

    read-service.ts

    command-service.ts

    errors.ts

    index.ts
```

Inventory、Pricing 全部相同。

---

# Database

每個 Aggregate 固定都有

```text
database/entities/

commerce/

    sku-row.ts

inventory/

    inventory-item-row.ts

pricing/

    price-row.ts
```

只有 Row。

不要有 Mapper。

---

# Repository Mapper

全部放 Repository 旁。

例如

```text
infra/

supabase/

repositories/

commerce/

    sku/

        sku-repository.ts

        sku-repository-mapper.ts

inventory/

    inventory/

        inventory-repository.ts

        inventory-repository-mapper.ts

pricing/

    price/

        price-repository.ts

        price-repository-mapper.ts
```

---

# SQL

Migration 我建議直接改成

```text
supabase/

migrations/

001_shared/

    001_schema.sql

    002_trigger.sql

002_commerce/

    001_products.sql

    002_categories.sql

    003_skus.sql

    004_rls.sql

    005_rpc.sql

003_inventory/

    001_inventory_items.sql

    002_rls.sql

    003_rpc.sql

004_pricing/

    001_prices.sql

    002_rls.sql

    003_rpc.sql
```

而不是一直照流水號。

未來維護方便很多。

---

# 每個 Table 固定包含

所有 Commerce Table 都固定有

```sql
ID

VERSION

CREATED_AT

UPDATED_AT
```

除了 Junction Table。

例如

```text
ROLE_PERMISSION

USER_ROLE
```

就不用。

---

# 每個 Table 固定 Trigger

全部使用

```sql
SHARED.TOUCH_ROW()
```

不要再各自建立 Trigger Function。

---

# 每個 Repository 固定 Mapper

一定有

```text
toDomain()

toCreateRow()

toUpdateRow()
```

沒有例外。

---

# 每個 Repository 固定 CRUD

```text
get()

getMany()

exists()

find()

create()

createMany()

update()

updateMany()

delete()

deleteMany()
```

---

# 每個 Domain 固定四個 DTO

例如 SKU

```text
SKU

CreateSKU

UpdateSKU

SKUQuery
```

Inventory

```text
InventoryItem

CreateInventoryItem

UpdateInventoryItem

InventoryQuery
```

Pricing

```text
Price

CreatePrice

UpdatePrice

PriceQuery
```

---

# 每個 Domain 固定 List

```text
SKUList

InventoryItemList

PriceList
```

全部都是

```ts
List<T>
```

---

# Repository 繼承

最後我會讓整個 Repository 長這樣。

```ts
export interface Repository<

    TEntity,

    TId,

    TCreate,

    TUpdate,

    TQuery,

    TList

> {

    get(id: TId): Promise<TEntity>;

    getMany(ids: readonly TId[]): Promise<readonly TEntity[]>;

    exists(id: TId): Promise<boolean>;

    find(query: TQuery): Promise<TList>;

    create(command: TCreate): Promise<TEntity>;

    createMany(commands: readonly TCreate[]): Promise<readonly TEntity[]>;

    update(command: TUpdate): Promise<TEntity>;

    updateMany(commands: readonly TUpdate[]): Promise<readonly TEntity[]>;

    delete(id: TId): Promise<void>;

    deleteMany(ids: readonly TId[]): Promise<void>;

}
```

SKU Repository

```ts
export interface SKURepository
    extends Repository<
        SKU,
        string,
        CreateSKU,
        UpdateSKU,
        SKUQuery,
        SKUList
    > {

    getByCode(code: string): Promise<SKU | null>;

    findByProduct(productId: string): Promise<SKUList>;

}
```

