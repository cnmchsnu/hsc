
import {
    DefaultRenderer,
    VariantRendererRegistry,
} from "./VariantRendererRegistry";

import type { VariantSelectorProps } from "./type";

export function VariantSelector(
    props: VariantSelectorProps,
) {

    const registryKey = props.option.option.name as keyof typeof VariantRendererRegistry;
    const Renderer = VariantRendererRegistry[registryKey] ?? DefaultRenderer;

    return <Renderer {...props} />;

}



