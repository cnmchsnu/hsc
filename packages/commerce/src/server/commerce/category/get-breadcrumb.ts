import { createCommerceContainer } from '../../../container';
import { BreadcrumbItem } from '../../../application/projections/category';

export async function getBreadcrumb(
    slug: string,
): Promise<readonly BreadcrumbItem[] | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getBreadcrumb(slug);
}