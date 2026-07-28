import { SaveProductCategoryCommand } from "../../sync";



export interface ProductCategoriesEditor {

    productId: string;

    categories: readonly SaveProductCategoryCommand[];


}

