import { createCommerceContainer } from '../../container';
import type { Category } from '../../category';

export async function listCategories(): Promise<Category[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.list();
}