import { createCommerceContainer } from '../../container';
import type { Category } from '../../category';

export async function getCategory(
    id: string,
): Promise<Category | null> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getById(id);

}