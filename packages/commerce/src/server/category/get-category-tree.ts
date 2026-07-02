import { createCommerceContainer } from '../../container';
import type { CategoryTree } from '../../category';

export async function getCategoryTree(): Promise<CategoryTree[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getTree();
}