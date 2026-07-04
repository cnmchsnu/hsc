import { createCommerceContainer } from '../../container';
import type { CategoryTree } from '../../application/read-models';

export async function getCategoryTree(): Promise<CategoryTree[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getTree();
}