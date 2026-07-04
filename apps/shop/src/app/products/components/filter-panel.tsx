'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Slider from '@radix-ui/react-slider';

import type { CategoryTree } from "@repo/commerce/read-models";



// export function CategoryNode({node}: {node: CategoryTree;}) {
//     const [ expanded, setExpanded ] = useState(false);

//     return (
//         <>
//             <button onClick={() => setExpanded(!expanded,)}>
//                 {node.name}
//             </button>
//             {expanded &&
//                 node.children.map(
//                     child => (
//                         <CategoryNode
//                             key={child.id}
//                             node={child}
//                         />
//                     ),
//                 )
//             }
//         </>
//     );

// }



export function FilterPanel({categories}: {categories: CategoryTree[]}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(["Stationery"]);
    const [priceRange, setPriceRange] = useState([200, 800]);

    useEffect(() => {
        const categoryParam = searchParams.get('categoryIds');
        const maxPriceParam = searchParams.get('maxPrice');
        const minPriceParam = searchParams.get('minPrice');

        if (categoryParam) {
            setSelectedCategories(categoryParam.split(','));
        }

        if (maxPriceParam && minPriceParam) {
            const [min, max] = [Number(minPriceParam), Number(maxPriceParam)];
            setPriceRange([min, max]);
        }
    }, [searchParams]);


    const handleCategoryChange = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
        } else {
        setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handlePriceChange = () => {

        const currentParams = new URLSearchParams(searchParams.toString());

        currentParams.set('minPrice', priceRange[0].toString());
        currentParams.set('maxPrice', priceRange[1].toString());

        router.push(`${pathname}?${currentParams.toString()}`);

    };

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-stack-lg bg-surface p-stack-lg rounded-xl border border-surface-variant shadow-sm">
                {/* Category Section */}
                {/* <div>
                    <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-4">商品分類</h3>
                    <ul className="space-y-stack-sm">
                    {categories.map(
                        <li key={c.id}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                            type="checkbox"
                            checked={selectedCategories.includes(c.id)}
                            onChange={() => handleCategoryChange(c.id)}
                            className="w-5 h-5 rounded border-outline text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant"
                            />
                            <span
                            className={`font-body-md transition-colors ${
                                selectedCategories.includes(c.id)
                                ? "text-on-primary-fixed-variant font-medium"
                                : "text-on-surface-variant group-hover:text-on-primary-fixed-variant"
                            }`}
                            >
                            {c.name} ({c.id})
                            </span>
                        </label>
                        </li>
                    ))}
                    </ul>
                </div> */}

                {/* Price Filter */}
                <div className="pt-stack-md border-t border-surface-variant">
                    <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-4">價格範圍</h3>
                    <div className="space-y-4">
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-full h-5"
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value)} // 數值變動時會自動更新陣列
                            min={0}
                            max={2000}
                            step={50}
                            onValueCommit={handlePriceChange}
                        >
                            <Slider.Track className="bg-white relative flex-grow h-1 rounded-full">
                            <Slider.Range className="absolute bg-on-primary-fixed-variant h-full rounded-full" />
                            </Slider.Track>
                            {/* 放兩個 Thumb，就會有兩個球！ */}
                            <Slider.Thumb 
                            className="block w-5 h-5 bg-white border-2 border-on-primary-fixed-variant rounded-full shadow-md hover:bg-blue-50 focus:outline-none cursor-pointer" 
                            aria-label="Minimum Price"
                            />
                            {/* 右邊控制最大值的球 */}
                            <Slider.Thumb 
                            className="block w-5 h-5 bg-white border-2 border-on-primary-fixed-variant rounded-full shadow-md hover:bg-blue-50 focus:outline-none cursor-pointer" 
                            aria-label="Maximum Price"
                            />
                        </Slider.Root>
                        <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                            <span>NT$ {priceRange[0]}</span>
                            <span className="font-bold text-on-primary-fixed-variant">NT$ {priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Promo Banner in Sidebar */}
                {/* <div className="rounded-lg bg-on-primary-fixed-variant p-4 text-on-primary relative overflow-hidden group">
                    <div className="relative z-10">
                    <p className="text-label-sm font-label-sm opacity-80 mb-1">年度限定</p>
                    <h4 className="font-headline-md text-[20px] font-bold mb-2">會員專屬 85 折</h4>
                    <button className="bg-white text-on-primary-fixed-variant px-4 py-1 rounded-full font-label-sm text-label-sm hover:scale-105 transition-transform active:scale-95">
                        立即升級
                    </button>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                    </span>
                    </div>
                </div> */}
            </div>
        </aside>
    )

}