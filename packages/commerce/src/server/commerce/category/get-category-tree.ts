import { createCommerceContainer } from '../../../container';
import { CategoryTree } from '../../../application';

export async function getCategoryTree(
): Promise<readonly CategoryTree[] | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getTree();
}