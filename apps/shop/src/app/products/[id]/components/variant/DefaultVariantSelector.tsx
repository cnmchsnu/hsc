import { VariantSelectorProps } from "./type";

export function DefaultVariantSelector({
    option,
    selectedValueIds,
    onSelect,
}: VariantSelectorProps) {
    return (
        <section>
            <h3 className="mb-3 font-bold">
                {option.option.displayName}
            </h3>
            <div className="flex flex-wrap gap-2">
                {option.values.map((value: any) => {
                    const selected =
                        selectedValueIds.includes(value.id);
                    return (
                        <button
                            key={value.id}
                            type="button"
                            onClick={() =>
                                onSelect(
                                    option.option.id,
                                    value.id,
                                )
                            }
                            className={`h-12 flex items-center justify-center px-4 border-2 rounded-lg transition-all hover:scale-110 font-label-md ${
                                    selected
                                        ? "border-on-primary-fixed-variant bg-surface-container-low text-on-primary-fixed-variant font-bold"
                                        : "border-surface-variant hover:border-on-primary-fixed-variant"
                                }
                            `}
                        >
                            {value.displayValue}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}