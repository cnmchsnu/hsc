import { createCommerceContainer } from '../../container';
import { BreadcrumbItem } from '../../application/projections';

export async function getBreadcrumb(
    slug: string
): Promise<readonly BreadcrumbItem[] | null> {

    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getBreadcrumb(slug);

    return result;
    
}