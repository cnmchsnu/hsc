import { ProductSearchRequest, ProductSummary } from '@repo/commerce/application';

import { useRef, useState } from 'react';



export async function useProductSearch(initialRequest: ProductSearchRequest) {

    const [request, setRequest] =
    useState<ProductSearchRequest>(initialRequest);

    const [products, setProducts] =
        useState<ProductSummary[]>([]);

    const pageRef = useRef(1);

    const [loading, setLoading] =
        useState(false);

    const [hasMore, setHasMore] =
        useState(true);

    async function fetchPage(
        page: number,
        append: boolean,
    ) {

        setLoading(true);

        const response =
            await fetch(
                "/api/products/search",
                {
                    method: "POST",
                    body: JSON.stringify({
                        ...request,
                        page,
                    }),
                },
            );

        const result =
            await response.json();

        setProducts(previous =>
            append
                ? [...previous, ...result.items]
                : result.items,
        );

        setHasMore(
            result.pagination.hasMore,
        );

        setLoading(false);

    };

    async function search(
        nextRequest: ProductSearchRequest,
    ) {
        setRequest(nextRequest);
        pageRef.current = 1;
        await fetchPage(1,false,);
    };

    async function refresh() {
        pageRef.current = 1;
        await fetchPage(
            1,
            false,
        );

    };

    async function loadMore() {

        if (loading || !hasMore) return;

        const nextPage = pageRef.current + 1;

        await fetchPage(nextPage,true);

        pageRef.current = nextPage;

    };


    return {
        loading,
        products,
        hasMore,
        loadMore,
        refresh,
        search,
    };
}