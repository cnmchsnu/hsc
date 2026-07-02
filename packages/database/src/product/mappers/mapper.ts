export function toProduct(data: any) {
    return {
        id: data.id,
        name: data.name,

        slug: data.slug,

        description: data.description,
        status: data.status,

        price: data.price,
        compareAtPrice: data.compare_at_price,
    };
}

