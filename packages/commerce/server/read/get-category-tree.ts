import { createCommerceContainer } from '../../container';
import { CategoryTreeNode } from '../../application/projections';
import { cache } from 'react';

export const getCategoryTree = cache(async (): Promise<readonly CategoryTreeNode[] | null> => {

    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getCategoryTree();

    return result;
    
});