export interface CollectionUpdate<TCurrent, TDesired> {

    current: TCurrent;

    desired: TDesired;

}

export interface CollectionDiffResult<
    TCurrent,
    TDesired,
> {

    create: readonly TDesired[];

    update: readonly CollectionUpdate<
        TCurrent,
        TDesired
    >[];

    delete: readonly TCurrent[];

}