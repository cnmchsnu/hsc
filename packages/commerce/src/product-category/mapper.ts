import type { Category, } from "../category";
import type { BreadcrumbItem } from "./product-category";

export function toBreadCrumbItem(
    category: Category,
): BreadcrumbItem {

    return {

        id: category.id,

        name: category.name,

        slug: category.slug,

    };

}