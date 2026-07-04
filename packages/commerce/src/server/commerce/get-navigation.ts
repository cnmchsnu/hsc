import { createCommerceContainer } from '../../container';
import { CategoryNavigation } from '../../application/projections/category';

export async function getNavigation(
    selectedId: string,
): Promise<CategoryNavigation | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getNavigation(selectedId);
}