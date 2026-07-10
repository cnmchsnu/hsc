import { createServerClient } from '@repo/infra/supabase/client';


import { SupabaseCategoryRepository } from '@repo/infra/supabase/repositories';
import { SupabaseCategoryIdentifier } from '@repo/infra/supabase/identifiers';

import { createCategoryReadService, type CategoryReadService } from '../application/read';
import { createCategoryService } from '../domain';
import { CategoryService } from '../domain/category';
import { CategoryResolveService, createCategoryResolveService } from '../application/identifiers';


export interface CategoryContainer {

    categoryReadService: CategoryReadService;

    categoryService: CategoryService;

    categoryResolveService: CategoryResolveService;

}

export async function createCategoryContainer(): Promise<CategoryContainer> {

    const client = 
        await createServerClient();

    const categoryRepository =
        new SupabaseCategoryRepository(client);

    const categoryResolveRepository =
        new SupabaseCategoryIdentifier(client)

    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    const categoryResolveService =
        createCategoryResolveService(
            categoryResolveRepository,
        );

    const categoryReadService =
        createCategoryReadService({
            categoryService,
        });

    return {
        
        categoryReadService,
        categoryService,
        categoryResolveService

    };
}