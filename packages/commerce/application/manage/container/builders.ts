
import { DefaultProductSkuGenerator, DefaultProductSkuCodeGenerator, DefaultSkuRebuilder } from "../builders";
import type { SkuRebuilder } from "../builders";





export function createSkuRebuilder(): SkuRebuilder {
    const productSkuCodeGenerator =
        new DefaultProductSkuCodeGenerator();

    const skuGenerator = 
        new DefaultProductSkuGenerator(productSkuCodeGenerator,);

    return new DefaultSkuRebuilder(skuGenerator);
    
}