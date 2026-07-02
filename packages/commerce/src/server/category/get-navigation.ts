import { createCommerceContainer } from '../../container';
import type { CategoryTree } from '../../category';

export async function getNavigation(): Promise<CategoryTree[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getNavigation();
}