import { diffCollection  } from '../diff';
import { CollectionUpdate } from '../diff/collection-diff-result';

export abstract class ChildCollectionSynchronizer<

    TParentId,

    TCurrent,

    TDesired,

> {

    async execute(

        id: TParentId,

        desired: readonly TDesired[],

    ): Promise<void> {

        const current =
            await this.loadCurrent(id);

        const diff =
            diffCollection({

                current,

                desired,

                currentKey: this.currentKey,

                desiredKey: this.desiredKey,

                equals: this.equals,

            });

        if (diff.create.length) {

            await this.createMany(

                id,

                diff.create,

            );

        }

        if (diff.update.length) {

            await this.updateMany(

                diff.update,

            );

        }

        if (diff.delete.length) {

            await this.deleteMany(

                diff.delete.map((item) => this.currentKey(item))

            );

        }

    }

    protected abstract loadCurrent(
        id: TParentId,
    ): Promise<
        readonly TCurrent[]
    >;

    protected abstract currentKey(
        current: TCurrent,
    ): string;

    protected abstract desiredKey(
        desired: TDesired,
    ): string | null;

    protected abstract equals(
        current: TCurrent,
        desired: TDesired,
    ): boolean;

    protected abstract createMany(
        id: TParentId,
        create: readonly TDesired[],
    ): Promise<void>;

    protected abstract updateMany(
        update: readonly CollectionUpdate<
            TCurrent,
            TDesired
        >[],
    ): Promise<void>;

    protected abstract deleteMany(
        remove: readonly string[],
    ): Promise<void>;

}