import type { Breadcrumb, Category } from "../../category/category";


export function toBreadcrumbItem(
    category: Category,
): Breadcrumb {

    return {

        id: category.id,

        slug: category.slug,

        name: category.name,

    };

}