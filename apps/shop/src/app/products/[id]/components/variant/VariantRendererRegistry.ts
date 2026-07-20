import { VariantOptionName } from "@repo/commerce/domain";

import { ColorVariantSelector } from "./ColorVariantSelector";
import { SizeVariantSelector } from "./SizeVariantSelector";
import { DefaultVariantSelector } from "./DefaultVariantSelector";

export const VariantRendererRegistry = {

    [VariantOptionName.COLOR]: ColorVariantSelector,

    [VariantOptionName.SIZE]: SizeVariantSelector,

} as const;

export const DefaultRenderer =
    DefaultVariantSelector;