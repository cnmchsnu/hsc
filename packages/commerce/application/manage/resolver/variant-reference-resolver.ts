import { VariantReference } from '../builders';


export interface VariantReferenceResolver {

    resolve(
        refs: readonly VariantReference[],
    ): Promise<Map<string, string>>;

}