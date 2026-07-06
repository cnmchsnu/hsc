import type { Category } from "../category";

import type { ProductCategoryRepository } from "@repo/database/repositories";

import { ProductCategory } from "./types";


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
    ): Promise<ProductCategory[] | null>;

    // Write Single

    create(
        relation: ProductCategory,
    ): Promise<void>;

    update(
        relation: ProductCategory,
    ): Promise<void>;

    delete(
        productId: string,
        categoryId: string,
    ): Promise<void>;

    // Write Batch

    createMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    updateMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    deleteMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

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
        ): Promise<ProductCategory[] | null> {
            if (!productIds || productIds.length === 0) {
                return null;
            }

            const relations =
                await repository.getPrimaryByProductIds(productIds);

            if (!relations) {
                return null;
            }

            return relations;
        },

        // Write Single

        async create(
            relation: ProductCategory,
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
                throw new Error("Relation is required");
            }

            await repository.update(relation);
        },

        async delete(
            productId: string,
            categoryId: string,
        ): Promise<void> {
            if (!productId || !categoryId) {
                return;
            }

            await repository.delete(productId, categoryId);
        },

        // Write Batch

        async createMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                return;
            }

            await repository.createMany(relations);
        },

        async updateMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                throw new Error("Relations are required");
            }

            await repository.updateMany(relations);
        },

        async deleteMany(
            relations: readonly ProductCategory[],
        ): Promise<void> {
            if (!relations || relations.length === 0) {
                return;
            }

            await repository.deleteMany(relations);

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