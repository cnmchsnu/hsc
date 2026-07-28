import { SaveProductImageCommand } from "../../sync";



export interface ProductImageEditor {

    productId: string;

    images: readonly SaveProductImageCommand[];

}

