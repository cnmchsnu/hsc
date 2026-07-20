import type { VariantSelectorProps } from "./type";

export function SizeVariantSelector({
    option,
    selectedValueIds,
    onSelect,
}: VariantSelectorProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-on-surface">選擇尺寸</span>
                {/* <button className="text-on-primary-fixed-variant text-sm underline font-medium">尺寸對照表</button> */}
            </div>
            <div className="flex gap-3">
                {option.values.map((value) => (
                    <button
                        key={value.id}
                        onClick={() => onSelect(
                                option.option.id,
                                value.id,
                            )}
                        className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all hover:scale-110 font-label-md ${
                          selectedValueIds.includes(value.id)
                          ? "border-on-primary-fixed-variant bg-surface-container-low text-on-primary-fixed-variant font-bold"
                          : "border-surface-variant hover:border-on-primary-fixed-variant"
                        }`}
                    >
                        {value.displayValue}
                    </button>
                ))}
            </div>
        </div>
    );

}