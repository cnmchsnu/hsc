import { createCommerceContainer } from '../../container';
import { CategoryPage } from '../../application/read/category';

export async function getCategoryPage(
    slug: string,
): Promise<CategoryPage | null> {
    const {
        categoryContainer,
    } = await createCommerceContainer();

    return categoryContainer.categoryReadService.getCategoryPage(slug);
}