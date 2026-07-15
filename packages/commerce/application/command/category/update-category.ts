import type { CategoryStatus } from "../../../domain/category";

export interface UpdateCategory {

    id: string;

    name?: string;

    slug?: string;

    description?: string | null;

    parentId?: string | null;

    status?: CategoryStatus;

    displayOrder?: number;

}