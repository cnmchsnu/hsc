import type { CategoryStatus } from "../../commerce/domain/category";


export interface CategoryRow {
    
    id: string;

    name: string;

    slug: string;

    description: string | null;

    parent_id: string | null;

    status: CategoryStatus;

    display_order: number;

    created_at: Date;

    updated_at: Date;

}