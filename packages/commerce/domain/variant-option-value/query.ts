import { Query } from "@repo/shared";

export interface VariantOptionValueQuery extends Query {

    ids?: readonly string[];

    optionIds?: readonly string[];

}