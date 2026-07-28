export interface CollectionDiffOptions<
    TCurrent,
    TDesired,
    TKey,
> {

    current: readonly TCurrent[];

    desired: readonly TDesired[];

    currentKey(
        current: TCurrent,
    ): TKey;

    desiredKey(
        desired: TDesired,
    ): TKey | null;

    equals?(
        current: TCurrent,
        desired: TDesired,
    ): boolean;

}