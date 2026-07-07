import type { Category } from "../../../domain/category";
import type { BreadcrumbItem } from "../build-breadcrumb";


export function toBreadcrumbItem(
    category: Category,
): BreadcrumbItem {

    return {

        id: category.id,

        slug: category.slug,

        name: category.name,

    };

}