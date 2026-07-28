
import { DefaultProductSkuGenerator, DefaultProductSkuCodeGenerator, DefaultSkuBuilder } from "../builders";
import type { SkuBuilder } from "../builders";





export function createSkuBuilder(): SkuBuilder {
    const productSkuCodeGenerator =
        new DefaultProductSkuCodeGenerator();

    const skuGenerator = 
        new DefaultProductSkuGenerator(productSkuCodeGenerator,);

    return new DefaultSkuBuilder(skuGenerator);
    
}