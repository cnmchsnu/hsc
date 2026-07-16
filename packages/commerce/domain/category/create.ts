import type { CategoryStatus } from "./type";

export interface CreateCategory {

    name: string;

    slug: string;

    description?: string | null;

    parentId?: string | null;

    status: CategoryStatus;

    displayOrder: number;

}