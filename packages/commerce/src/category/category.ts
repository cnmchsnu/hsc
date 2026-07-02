


export const CategoryStatus = {

    ACTIVE: "active",

    INACTIVE: "inactive",

} as const;

export type CategoryStatus =
    typeof CategoryStatus[keyof typeof CategoryStatus];

export interface Category {

    id: string;

    name: string;

    slug: string;

    description: string | null;

    parentId: string | null;

    status: CategoryStatus;

    displayOrder: number;

    createdAt: Date;

    updatedAt: Date;

}

export interface CategoryTree {

    category: Category;

    children: CategoryTree[];

}

export interface CategoryGraph {

    categories: Map<string, Category>;

    roots: CategoryTree[];

    tree: Map<string, CategoryTree>;

}

export interface Breadcrumb {

    id: string;

    slug: string;

    name: string;

}