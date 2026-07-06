import { createCommerceContainer } from '../../container';
import { CategoryTree } from '../../application/projections';

export async function getCategoryTree(): Promise<readonly CategoryTree[] | null> {
    const {
        categoryContainer,
    } = await createCommerceContainer();

    return categoryContainer.categoryReadService.getCategoryTree();
}