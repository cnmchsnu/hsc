import {
    CollectionDiffOptions,
} from "./collection-diff-options";

import {
    CollectionDiffResult,
    CollectionUpdate,
} from "./collection-diff-result";

export function diffCollection<
    TCurrent,
    TDesired,
    TKey,
>(
    options: CollectionDiffOptions<
        TCurrent,
        TDesired,
        TKey
    >,
): CollectionDiffResult<
    TCurrent,
    TDesired
> {

    const currentMap =
        new Map<TKey, TCurrent>();

    for (const current of options.current) {

        currentMap.set(
            options.currentKey(current),
            current,
        );

    }

    const desiredKeys =
        new Set<TKey>();

    const create: TDesired[] = [];

    const update: CollectionUpdate<
        TCurrent,
        TDesired
    >[] = [];

    const equals =
        options.equals ??
        (() => false);

    for (const desired of options.desired) {

        const key =
            options.desiredKey(desired);

        /**
         * 沒有 Key
         * 代表一定是 Create
         */

        if (key == null) {

            create.push(desired);

            continue;

        }

        desiredKeys.add(key);

        const current =
            currentMap.get(key);

        /**
         * DB 不存在
         */

        if (!current) {

            create.push(desired);

            continue;

        }

        /**
         * Dirty Check
         */

        if (!equals(current, desired)) {

            update.push({

                current,

                desired,

            });

        }

    }

    const remove: TCurrent[] = [];

    for (const current of options.current) {

        const key =
            options.currentKey(current);

        if (!desiredKeys.has(key)) {

            remove.push(current);

        }

    }

    return {

        create,

        update,

        delete: remove,

    };

}