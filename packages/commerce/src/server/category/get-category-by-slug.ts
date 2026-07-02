import { createCommerceContainer } from '../../container';
import type { Category } from '../../category';

export async function getCategoryBySlug(
    slug: string,
): Promise<Category | null> {
    const {
        categoryService,
    } = await createCommerceContainer();

    return categoryService.getBySlug(slug);
}