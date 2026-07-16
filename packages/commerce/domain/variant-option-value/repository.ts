import { Repository } from "@repo/shared";

import { VariantOptionValue } from "./type";
import { VariantOptionValueQuery } from "./query";
import { CreateVariantOptionValue } from "./create";
import { UpdateVariantOptionValue } from "./update";
import { VariantOptionValueList } from "./list";



export interface VariantOptionValueRepository
    extends Omit<Repository<
        VariantOptionValue,
        string,
        CreateVariantOptionValue,
        UpdateVariantOptionValue,
        VariantOptionValueQuery,
        VariantOptionValueList
    >, 
        'exists'
    > {

    exists(
        optionId: string,
        value: string,
    ): Promise<boolean>;

}