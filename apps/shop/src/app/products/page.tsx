import { ProductSort } from "@repo/commerce/domain";
import {
    FilterPanel,
    ProductGrid,
} from "./components";

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
            keyword: searchCriteria.keyword,
            categorySlugs: searchCriteria.categorySlugs,
            minPrice: searchCriteria.minPrice,
            maxPrice: searchCriteria.maxPrice,
            sort: searchCriteria.sort,
            page: searchCriteria.page || 1,
            pageSize: searchCriteria.pageSize|| 20,
        })
    ]);

    if (!categories) {
        // Handle the case where categories are not available
        return <div>Failed to load categories</div>;
    }

    if (!products) StoreNotReady();



    return (
        <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
        {/* Left Sidebar Filter */}
        <FilterPanel categoriesTreeNode={categories!} />

        {/* Main Product Grid Area */}
        <ProductGrid products={products!} />
        </div>
    );
}
