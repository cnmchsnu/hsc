import { createCommerceContainer } from '../../container';
import { Category } from '../../domain';

export async function getCategories(): Promise<readonly Category[] | null> {

    const {
        categoryContainer,
    } = await createCommerceContainer();

    const result = await categoryContainer.categoryReadService.getCategoryies();

    return result;
    
}