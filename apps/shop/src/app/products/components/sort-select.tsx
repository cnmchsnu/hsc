'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ProductSearchResult } from "@repo/commerce/queries";

export function SortSelect({sortcount}: {sortcount: ProductSearchResult["total"]}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sortBy, setSortBy] = useState('最新上架');

    useEffect(() => {
        setSortBy(searchParams.get('sort') || 'newest');
    }, [searchParams.get('sort')]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const currentParams = new URLSearchParams(searchParams.toString());
        
        setSortBy(event.target.value);
        
        currentParams.set('sort', event.target.value);

        router.push(`${pathname}?${currentParams.toString()}`);
    }

    const sortOptions = [
        { value: 'newest', label: '時間：最新上架' },
        { value: 'oldest', label: '時間：最早上架' },
        { value: 'price-asc', label: '價格：由低到高' },
        { value: 'price-desc', label: '價格：由高到低' },
        { value: 'name-asc', label: '名稱：A-Z' },
        { value: 'name-desc', label: '名稱：Z-A' },
    ];


    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-stack-md">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold text-3xl">探索所有商品</h2>
                    <p className="font-body-md text-on-surface-variant mt-1">
                    共有 {sortcount} 件符合條件的商品
                    </p>
                </div>
                <div className="flex items-center gap-stack-md self-end sm:self-auto">
                    <span className="text-label-sm font-label-sm text-on-surface-variant whitespace-nowrap">排序：</span>
                    <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="bg-surface border border-surface-variant rounded-lg px-3 py-2 text-body-md focus:ring-on-primary-fixed-variant focus:border-on-primary-fixed-variant min-w-[160px] outline-none"
                    >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
    )

}
