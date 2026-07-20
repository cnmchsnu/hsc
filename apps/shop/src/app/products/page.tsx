import { ProductSort } from "@repo/commerce/domain";
import {
    FilterPanel,
    ProductGrid,
} from "./components";

import { Suspense } from "react";

import { getCategoryTree, searchProduct } from "@repo/commerce/server";
import StoreNotReady from "./not-opened";

type searchParams = Promise<{
    keyword?: string;
    
    categorySlugs?: readonly string[];
    
    minPrice?: number;
    
    maxPrice?: number;
    
    sort?: ProductSort;
    
    page: number;
    
    pageSize: number;
}>;

interface PageProps {
    searchParams: searchParams;
}


export default async function ProductList({ searchParams }: PageProps) {

    const searchCriteria = await searchParams;

    const [categories, products] = await Promise.all([
        getCategoryTree(),
        searchProduct({
            ...(searchCriteria.keyword && {keyword: searchCriteria.keyword}),
            page: searchCriteria.page || 1,
            pageSize: searchCriteria.pageSize || 20,
            ...(searchCriteria.categorySlugs && { categorySlugs: searchCriteria.categorySlugs }),
            ...(searchCriteria.minPrice !== undefined && { minPrice: searchCriteria.minPrice }),
            ...(searchCriteria.maxPrice !== undefined && { maxPrice: searchCriteria.maxPrice }),
            ...(searchCriteria.sort && { sort: searchCriteria.sort }),
        })
    ]);``

    if (!categories) {
        // Handle the case where categories are not available
        return <div>Failed to load categories</div>;
    }

    if (!products) StoreNotReady();



    return (
        <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
        {/* Left Sidebar Filter */}
        <Suspense fallback={<span className="text-on-surface-variant text-center">Loading Filters...</span>}>
            <FilterPanel categoriesTreeNode={categories!} />
        </Suspense>

        {/* Main Product Grid Area */}
        <Suspense fallback={<span className="text-on-surface-variant text-center">Loading products...</span>}>
            <ProductGrid products={products!} />
        </Suspense>
        </div>
    );
}

