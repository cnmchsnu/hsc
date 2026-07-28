import { createCommerceContainer } from '../../container';
import { CategoryTreeNode } from '../../application/projections';

export async function getCategoryTree(): Promise<readonly CategoryTreeNode[] | null> {

    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getCategoryTree();

    return result;
    
}