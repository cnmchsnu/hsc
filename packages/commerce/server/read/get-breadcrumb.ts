import { createCommerceContainer } from '../../container';
import { BreadcrumbItem } from '../../application/projections';
import { cache } from 'react';

export const getBreadcrumb = cache(async (
    slug: string
): Promise<readonly BreadcrumbItem[] | null> => {

    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getBreadcrumb(slug);

    return result;
    
});