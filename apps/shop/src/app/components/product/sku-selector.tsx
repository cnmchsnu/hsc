'use client'

import { useState } from "react";


export function SkuSelector() {

    const [qty, setQty] = useState(1);
    const [activeThumb, setActiveThumb] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("M");

    const handleQtyChange = (val: number) => {
        const newQty = qty + val;
        if (newQty >= 1) setQty(newQty);
    };

    const productData = {
        colors: ["#001D4A", "#343A40", "#E9ECEF"],
        sizes: ["S", "M", "L", "XL"],
    };


    return (
        <div className="space-y-6 mb-stack-lg">
            <div>
              <span className="block font-bold text-on-surface mb-3">選擇顏色</span>
              <div className="flex gap-3">
                {productData.colors.map((c, idx) => (
                  <button
                    key={idx}
                    style={{ backgroundColor: c }}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === idx ? "border-on-primary-fixed-variant ring-2 ring-offset-2 ring-primary-container/45" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-on-surface">選擇尺寸</span>
                <button className="text-on-primary-fixed-variant text-sm underline font-medium">尺寸對照表</button>
              </div>
              <div className="flex gap-3">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all font-label-md ${
                      selectedSize === s
                        ? "border-on-primary-fixed-variant bg-surface-container-low text-on-primary-fixed-variant font-bold"
                        : "border-surface-variant hover:border-on-primary-fixed-variant"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-bold text-on-surface mb-3">數量</span>
              <div className="flex items-center w-32 border-2 border-surface-variant rounded-lg overflow-hidden bg-surface">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  onClick={() => handleQtyChange(-1)}
                >
                  <span className="material-symbols-outlined text-sm font-bold">remove</span>
                </button>
                <span className="w-12 text-center font-label-md font-bold select-none text-on-surface">
                  {qty}
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  onClick={() => handleQtyChange(1)}
                >
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
    )
}