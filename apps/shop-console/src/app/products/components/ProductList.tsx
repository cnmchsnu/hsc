'use client';


import { useState, useEffect } from "react";

import { RadixMultiSelect } from "../../components/ui";
import { ProductTable } from "./ProductTable";

import { useProductSearch } from "@repo/commerce-react";
import { ProductSort, ProductStatus } from "@repo/commerce/domain";

export function ProductList
() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("所有分類");
    const [selectedStockStatus, setSelectedStockStatus] = useState("供應狀態");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState("newest");

    const { loading, products, hasMore, loadMore, refresh, search } = useProductSearch({
        filter: {
            status: ['active', 'draft', 'archived'],
        },
        sort: "newest",
        page: 1,
        pageSize: 10,
    });

    console.log("products", products.map(p => p.product));

    useEffect(() => {
        refresh();
    }, []);

    const sortOptions = [
        { value: 'newest', label: '時間：最新上架' },
        { value: 'oldest', label: '時間：最早上架' },
        // { value: 'price-asc', label: '價格：由低到高' },
        // { value: 'price-desc', label: '價格：由高到低' },
        { value: 'name-asc', label: '名稱：A-Z' },
        { value: 'name-desc', label: '名稱：Z-A' },
    ];

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;

        setSelectedSort(selected);

        search({
            filter: {
                status: [...selectedStatuses] as ProductStatus[],
            },
            page: 1,
            pageSize: 10,
            sort: selectedSort as ProductSort,
        })
    };

    const statusOptions = [
        { value: "draft", label: '草稿' },
        { value: 'active', label: '已發布' },
        { value: 'archived', label: '已封存' },
    ];

    const handleStatusChange = (selectedStatuses: string[]) => {
        setSelectedStatuses(selectedStatuses);
        console.log("selectedStatuses", selectedStatuses);
        
        search({
            filter: {
                status: selectedStatuses.length > 0 ? selectedStatuses as ProductStatus[] : ['active', 'draft', 'archived'],
            },
            page: 1,
            pageSize: 10,
            sort: selectedSort as ProductSort,
        })
    };



    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-wrap items-center gap-3 bg-surface-container-low/30">
            <div className="relative flex-1 min-w-[240px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                    search
                </span>
                <input
                    className="w-full bg-white border border-outline-variant rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 focus:border-on-primary-fixed-variant transition-all"
                    placeholder="搜尋名稱、SKU 或分類..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* <select
                className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                value={selectedStockStatus}
                onChange={(e) => setSelectedStockStatus(e.target.value)}
            >
                <option>供應狀態</option>
                <option>有現貨</option>
                <option>庫存緊張</option>
                <option>缺貨</option>
            </select> */}
            <RadixMultiSelect
                    options={statusOptions}
                    selected={selectedStatuses}
                    onChange={handleStatusChange}
                    placeholder="所有狀態"
                    className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                />
            <div className="w-px h-6 bg-outline-variant mx-1"></div>
            <span className="material-symbols-outlined text-[18px]">sort</span>
            <select
                className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                value={selectedCategory}
                onChange={handleSortChange}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            </div>

            {/* Table Content */}
            <ProductTable
                products={products}
                hasMore={hasMore}
                loading={loading}
                loadMore={loadMore}
            />
        </div>

    );
}