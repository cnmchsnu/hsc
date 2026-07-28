
import { CreateProductCategory } from "./create";
import type { ProductCategoryRepository } from "./repository";

import { ProductCategory } from "./types";

import { ValidationError } from "@repo/shared/application";


export interface ProductCategoryService {
    // Relation Single

    getByProductId(
        productId: string,
    ): Promise<readonly ProductCategory[]>;

    getByCategoryId(
        categoryId: string,
    ): Promise<readonly ProductCategory[]>;
    
    getPrimaryByProductId(
        productId: string,
    ): Promise<ProductCategory | null>;

    // Relation Batch
    
    getByProductIds(
        productIds: string[],
    ): Promise<readonly ProductCategory[]>;

    getByCategoryIds(
        categoryIds: string[],
    ): Promise<readonly ProductCategory[]>;

    getPrimaryByProductIds(
        productIds: string[],
    ): Promise<readonly ProductCategory[]>;

    create(
        relation: CreateProductCategory,
    ): Promise<void>;

    update(
        relation: ProductCategory,
    ): Promise<void>;

    createMany(
        relations: readonly CreateProductCategory[],
    ): Promise<void>;

    updateMany(
        relations: readonly CreateProductCategory[],
    ): Promise<void>;

    deleteMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    // delete

    deleteManyByProductId(
        productId: string,
    ): Promise<void>;

    deleteManyByCategoryId(
        categoryId: string,
    ): Promise<void>;

}


export function createProductCategoryService(
    repository: ProductCategoryRepository,
): ProductCategoryService {
    return {

        // Relation Single

        async getByProductId(
            productId: string,
        ): Promise<readonly ProductCategory[]> {
            if (!productId) {
                return [];
            }

            const relations =
                await repository.getByProductId(productId);

            if (!relations) {
                return [];
            }

            return relations;
        },

        async getByCategoryId(
            categoryId: string,
        ): Promise<readonly ProductCategory[]> {
            if (!categoryId) {
                return [];
            }

            const relations =
                await repository.getByCategoryId(categoryId);

            if (!relations) {
                return [];
            }

            return relations;
        },

        async getPrimaryByProductId(
            productId: string,
        ): Promise<ProductCategory | null> {
            if (!productId) {
                return null;
            }

            const relation =
                await repository.getPrimaryByProductId(productId);
            
            if (!relation) {
                return null;
            }

            return relation;
        },

        // Relation Batch

        async getByProductIds(
            productIds: string[],
        ): Promise<readonly ProductCategory[]> {
            if (!productIds || productIds.length === 0) {
                return [];
            }

            const relations =
                await repository.getByProductIds(productIds);

            if (!relations) {
                return [];
            }

            return relations;
        },

        async getByCategoryIds(
            categoryIds: string[],
        ): Promise<readonly ProductCategory[]> {
            if (!categoryIds || categoryIds.length === 0) {
                return [];
            }

            const relations =
                await repository.getByCategoryIds(categoryIds);

            if (!relations) {
                return [];
            }

            return relations;
        },

        async getPrimaryByProductIds(
            productIds: string[],
        ): Promise<readonly ProductCategory[]> {
            if (!productIds || productIds.length === 0) {
                return [];
            }

            const relations =
                await repository.getPrimaryByProductIds(productIds);

            if (!relations) {
                return [];
            }

            return relations;
        },


        // Write Single

        async create(
            relation: CreateProductCategory,
        ): Promise<void> {
            if (!relation) {
                return;
            }

            await repository.create(relation);
        },

        async update(
            relation: ProductCategory,
        ): Promise<void> {
            if (!relation) {
                throw new ValidationError("Relation is required");
            }

            await repository.update(relation);
        },


        // Write Batch

        async createMany(
            relations: readonly CreateProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                return;
            }

            await repository.createMany(relations);
        },

        async updateMany(
            relations: readonly CreateProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                throw new ValidationError("Relations are required");
            }

            await repository.updateMany(relations);
        },


        async deleteMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                return;
            }

            await repository.deleteMany([],relations);
        },


        async deleteManyByProductId(
            productId: string,
        ): Promise<void> {
            if (!productId) {
                return;
            }

            await repository.deleteManyByProductId(productId);
        },

        async deleteManyByCategoryId(
            categoryId: string,
        ): Promise<void> {
            if (!categoryId) {
                return;
            }

            await repository.deleteManyByCategoryId(categoryId);
        },

    };
}