import { Repository } from "@repo/shared";

import { VariantOption, VariantOptionName } from "./type";
import { VariantOptionQuery } from "./query";
import { CreateVariantOption } from "./create";
import { UpdateVariantOption } from "./update";
import { VariantOptionList } from "./list";



export interface VariantOptionRepository
    extends Omit<Repository<
        VariantOption,
        string,
        CreateVariantOption,
        UpdateVariantOption,
        VariantOptionQuery,
        VariantOptionList
    >, 
        'exists'
    > {

    exists(
        productId: string,
        name: VariantOptionName,
    ): Promise<boolean>;

}