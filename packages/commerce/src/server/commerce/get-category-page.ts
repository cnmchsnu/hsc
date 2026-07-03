import { createCommerceContainer } from '../../container';
import { CategoryPage } from '../../application/read-models';

export async function getCategoryPage(
    slug: string,
): Promise<CategoryPage | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getCategoryPage(slug);
}