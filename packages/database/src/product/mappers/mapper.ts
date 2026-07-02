export function toProduct(data: any) {
    return {
        id: data.id,
        name: data.name,

        slug: data.slug,

        description: data.description,
        status: data.status,

        price: data.price,
        compareAtPrice: data.compare_at_price,


        categories: data.product_categories?.map((category: any) => ({
            id: category.categories.id,
            slug: category.categories.slug,
            name: category.categories.name,
        })),
        
        images: data.images?.map((image: any) => ({
            id: image.id,
            url: image.url,
            alt: image.alt,
        })),
    };
}

export function toImage(data: any) {
    return {

        id: data.id,

        url: data.storage_path,

        alt: null,

        sortOrder: data.display_order,

    };
}