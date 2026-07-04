import { createCommerceContainer } from '../../container';
import type { CategoryTree } from '../../application/read-models';

export async function getNavigation(): Promise<CategoryTree[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getNavigation();
}