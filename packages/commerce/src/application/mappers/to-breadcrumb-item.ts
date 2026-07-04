import type { Category } from "../../category/category";
import type { BreadcrumbItem } from "../projections";


export function toBreadcrumbItem(
    category: Category,
): BreadcrumbItem {

    return {

        id: category.id,

        slug: category.slug,

        name: category.name,

    };

}