import { Query } from "@repo/shared";

export interface VariantOptionQuery extends Query {

    ids?: readonly string[];

    productIds?: readonly string[];

    names?: readonly string[];

}