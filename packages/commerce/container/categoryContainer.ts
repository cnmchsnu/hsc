import { createServerClient } from '@repo/database/client/server';


import { SupabaseCategoryRepository } from '@repo/infra/supabase/repositories';

import { createCategoryReadService, type CategoryReadService } from '../application/read';
import { createCategoryService } from '../domain';
import { CategoryService } from '../domain/category';


export interface CategoryContainer {

    categoryReadService: CategoryReadService;

    categoryService: CategoryService;

}

export async function createCategoryContainer(): Promise<CategoryContainer> {

    const client = 
        await createServerClient();

    const categoryRepository =
        new SupabaseCategoryRepository(client);

    const categoryService =
        createCategoryService(
            categoryRepository,
        );

    const categoryReadService =
        createCategoryReadService({
            categoryService,
        });

    return {
        
        categoryReadService,
        categoryService
    };
}