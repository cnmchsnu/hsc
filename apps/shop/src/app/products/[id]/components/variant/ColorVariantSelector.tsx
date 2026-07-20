import type { VariantSelectorProps } from "./type";

export function ColorVariantSelector({
    option,
    selectedValueIds,
    onSelect,
}: VariantSelectorProps) {
    return (
        <div>
            <span className="block font-bold text-on-surface mb-3">
                {option.option.displayName}
            </span>
            <div className="flex gap-3">
                {option.values.map((value) => (
                    <button
                        key={value.id}
                        style={{ backgroundColor: value.value }}
                        onClick={() => onSelect(
                                option.option.id,
                                value.id,
                            )}
                        className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                            selectedValueIds.includes(value.id)
                            ? "border-outline ring-2 ring-offset-2 ring-primary-container/45"
                            : "border-outline-variant "
                        }`}
                        title={value.displayValue}
                    />
                ))}
            </div>
        </div>
    );
}