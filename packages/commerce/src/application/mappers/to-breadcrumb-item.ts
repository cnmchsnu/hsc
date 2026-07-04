import type { Category } from "../../category/category";
import type { Breadcrumb } from "../projections/category";


export function toBreadcrumbItem(
    category: Category,
): Breadcrumb {

    return {

        id: category.id,

        slug: category.slug,

        name: category.name,

    };

}