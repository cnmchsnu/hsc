import { createCommerceContainer } from '../../container';
import type { Breadcrumb } from '../../category';

export async function getBreadcrumb(
    categoryId: string,
): Promise<Breadcrumb[]> {

    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getBreadcrumb(categoryId);
}