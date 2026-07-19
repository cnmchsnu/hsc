import { createCommerceContainer } from '../../container';
import { CategoryTreeNode } from '../../application/projections';
import { cache } from 'react';

export const getCategoryTree = cache(async (): Promise<readonly CategoryTreeNode[] | null> => {
    console.time("getCategoryTree");
    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getCategoryTree();

    console.timeEnd("getCategoryTree");

    return result;
});