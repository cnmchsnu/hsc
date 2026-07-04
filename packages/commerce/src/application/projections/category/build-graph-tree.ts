import type { Category } from '../../../category';
import { buildCategoryGraph } from './build-graph';
import { toCategoryTree } from '../../mappers';

export interface CategoryTree {

    category: Category;

    children: CategoryTree[];

}

export function buildCategoryTree(
    categories: readonly Category[],
): readonly CategoryTree[] {

    const graph =
        buildCategoryGraph(categories);

    return toCategoryTree(graph);


}