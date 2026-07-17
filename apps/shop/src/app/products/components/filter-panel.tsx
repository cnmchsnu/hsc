'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Slider from '@radix-ui/react-slider';

import type { CategoryTreeNode } from "@repo/commerce/application";

import { ChevronRight, ChevronDown, Check} from 'lucide-react';



interface CategoryNodeProps {
    node: CategoryTreeNode;
    selectedCategories: string[];
    onCategoryChange: (id: string) => void;
}

export function CategoryNode({ 
    node, 
    selectedCategories, 
    onCategoryChange 
}: CategoryNodeProps) {
    // 預設關閉，如果想讓有選中子項目的節點預設展開，可以微調初始值
    const [expanded, setExpanded] = useState(false);

    const isChecked = selectedCategories.includes(node.slug);

    return (
        <>
            <li 
                className="flex flex-col list-none"
                // 根據深度動態給予縮排，這裡用 inline style 最安全，避免 Tailwind 找不到動態 class
                style={{ paddingLeft: `${node.depth * 16}px` }}
            >
                <div className="flex items-center gap-2 py-1">
                    {/* 1. 展開/折疊按鈕：只有當有子節點時才顯示 */}
                    <div className="w-6 h-6 flex items-center justify-center">
                        {node.hasChildren && (
                            <button
                                type="button"
                                onClick={() => setExpanded(!expanded)}
                                className="text-on-surface-variant hover:bg-surface-variant rounded p-0.5 transition-transform duration-200"
                                style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                            >
                                {isChecked ? (
                                    <ChevronRight size={16} className="text-on-primary-fixed-variant" />
                                ) : (
                                    <ChevronDown size={16} className="text-on-surface-variant" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* 2. 主體 Checkbox 與 Label */}
                    <label className="flex items-center gap-3 cursor-pointer group flex-grow select-none ">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onCategoryChange(node.slug)}
                            className="sr-only peer"
                        />
                        {/* 2. 外框：只要 group 裡面有被勾選的 ([:checked])，自己就變色 */}
                        <div className="
                            w-5 h-5 rounded border border-outline flex items-center justify-center transition-all shrink-0
                            group-has-[:checked]:bg-on-primary-fixed-variant 
                            group-has-[:checked]:border-on-primary-fixed-variant
                            group-hover:border-on-primary-fixed-variant
                        ">
                            <Check size={32} className="text-white transition-transform duration-200 scale-0 group-has-[:checked]:scale-100" />   
                        </div>
                        
                        <span
                            className={`font-body-md transition-colors hover:font-bold ${
                                isChecked
                                    ? "text-on-primary-fixed-variant font-medium"
                                    : "text-on-surface-variant group-hover:text-on-primary-fixed-variant"
                            }`}
                        >
                            {node.name}
                        </span>
                    </label>
                </div>
            </li>

            {/* 3. 遞迴渲染子節點 */}
            {node.hasChildren && expanded && node.children.length > 0 && (
                <div className="flex flex-col">
                    {node.children.map(child => (
                        <CategoryNode
                            key={child.slug}
                            node={child}
                            selectedCategories={selectedCategories}
                            onCategoryChange={onCategoryChange}
                        />
                    ))}
                </div>
            )}
        </>
    );
}



export function FilterPanel({categoriesTreeNode}: {categoriesTreeNode: readonly CategoryTreeNode[]}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);

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


    const handleCategoryChange = (categorySlug: string) => {

        const currentParams = new URLSearchParams(searchParams.toString());

        if (selectedCategories.includes(categorySlug)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== categorySlug));
            currentParams.set('categorySlugs', selectedCategories.filter((c) => c !== categorySlug).join(','));
        } else {
            setSelectedCategories([...selectedCategories, categorySlug]);
            currentParams.set('categorySlugs', [...selectedCategories, categorySlug].join(','));
        }
        router.push(`${pathname}?${currentParams.toString()}`);
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
                <div className="justify-between items-center">
                    <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-4">商品分類</h3>
                    <ul className="justify-between items-center space-y-2">
                    {categoriesTreeNode.map((node) => (
                        <CategoryNode
                            key={node.slug}
                            node={node}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                        />
                    ))}
                    </ul>
                </div>

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