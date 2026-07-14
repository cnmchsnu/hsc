export type RepositoryMapper<
    TEntity,
    TRow,
    TCreate,
    TUpdate,
> = {

    fromRow(
        row: TRow,
    ): TEntity;

    fromRows(
        rows: readonly TRow[],
    ): readonly TEntity[];

    toCreateRow(
        dto: TCreate,
    ): Partial<TRow>;

    toCreateRows(
        dto: readonly TCreate[],
    ): readonly Partial<TRow>[];

    toUpdateRow(
        dto: TUpdate,
    ): Partial<TRow>;

    toUpdateRows(
        dto: readonly TUpdate[],
    ): readonly Partial<TRow>[];
}