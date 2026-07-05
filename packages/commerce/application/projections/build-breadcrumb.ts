import type { Category } from "../../domain/category";

import { toBreadcrumbItem } from "./mappers/to-breadcrumb-item";

export interface BreadcrumbItem {

    id: string;

    slug: string;

    name: string;

}


export function buildBreadcrumb(
    path: readonly Category[],
): readonly BreadcrumbItem[] {

    return path.map(toBreadcrumbItem);
}