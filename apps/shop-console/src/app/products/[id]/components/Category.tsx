'use client';

import { useState, useEffect } from "react";

import { ProductManageDetail } from "@repo/commerce/application";

import { updateCategoriesAction, getCategoriesAction } from "@/actions/commerce"

import { RadixMultiSelect } from "../../../components/ui";

interface CategoryProps {
    productData: ProductManageDetail;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}



export function ProductCategory({ productData, onChange }: CategoryProps) {
    const [collapsedCard, setCollapsedCard] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [productCategories, setProductCategories] = useState(productData.categories);


    const [primaryCategory, setPrimaryCategory] = useState<string>("");
    const [selectSecCat, setSelectSecCat] = useState<string[]>([]);

    useEffect(() => {
      if (productData?.categories) {
        const primary = productData.categories.find((cat) => cat.is_primary);
        setPrimaryCategory(primary?.category_id || "");

        const secondary = productData.categories
          .filter((cat) => !cat.is_primary)
          .map((cat) => cat.category_id);
        setSelectSecCat(secondary);
      }
    }, [productData?.categories]);

    useEffect(() => {
      async function fetchCategories() {
        try {
          const data = await getCategoriesAction();
          setCategories(data); // 使用 setState 更新
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }

      fetchCategories();
    }, []);

    

    const handlePrimaryCategoryChange = (categoryId: string) => {

        let newCategories = productCategories.filter(cat => cat.category_id !== categoryId);

        setPrimaryCategory(categoryId);

        const oldPrimary = productCategories.find(cat => cat.is_primary);

        if (oldPrimary) {
            newCategories = newCategories.map(cat => 
                cat.category_id === oldPrimary.category_id ? { ...cat, is_primary: false } : cat
            );
        }

        newCategories = newCategories.filter(cat => cat.category_id !== categoryId);

        newCategories.push({
            product_id: productData.product.id,
            category_id: categoryId,
            is_primary: true,
            display_order: 0
        });
        setProductCategories(newCategories);
        onChange({ ...productData, categories: productCategories });
    }

    const handleSecondaryCategoryChange = (selectedIds: string[]) => {
        let newCategories = productCategories.filter(cat => cat.is_primary);
        selectedIds.forEach((id, index) => {
            newCategories.push({
                product_id: productData.product.id,
                category_id: id,
                is_primary: false,
                display_order: index
            });
        });
        setSelectSecCat(selectedIds);
        setProductCategories(newCategories);
        onChange({ ...productData, categories: productCategories });
    }

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCollapsedCard(false);
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);
        try {
            await updateCategoriesAction({
                productId: productData.product.id,
                categories: productCategories.map((cat) => ({
                    product_id: productData.product.id,
                    category_id: cat.category_id,
                    is_primary: cat.is_primary ?? false,
                    display_order: cat.display_order
                }))
            });
            setSuccessMessage("商品分類已成功更新！");
        } catch (error) {
            console.error("更新商品分類時發生錯誤:", error);
            setError("更新商品分類時發生錯誤，請稍後再試。");
        }
      setIsSaving(false);
    };


    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-6 cursor-pointer group"
              onClick={() => setCollapsedCard(!collapsedCard)}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCard ? "-rotate-90" : ""
                  }`}
                >
                  expand_more
                </span>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    商品分類
                  </h3>
                  {/* <p className="text-on-surface-variant text-sm mt-1">
                    將商品指派至層級結構。
                  </p> */}
                </div>
              </div>
              {error && <span className="text-error text-sm">{error}</span>}
              {successMessage && <span className="text-success text-sm">{successMessage}</span>}
              {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
              {!isSaving && (
                <button
                  type="button"
                  disabled={!productData.product.id || isSaving}
                  className={`px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl transition-colors text-sm${
                          !productData.product.id || isSaving ? 'cursor-not-allowed bg-surface-container-low' : 'bg-surface-container hover:bg-surface-container-high'
                        }`}
                  onClick={handleSave}
                >
                  儲存變更
                </button>
              )}
            </div>
            {!collapsedCard && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-6"></div>
                <div className="flex flex-row items-start gap-4 space-y-4">
                  <div className="flex-1">
                    <label className="font-mono text-xs uppercase text-on-surface-variant tracking-wider">
                      主分類
                    </label>
                    <select
                        className="w-full border border-outline-variant rounded-xl p-4 space-y-3 bg-surface max-h-48 overflow-y-auto"
                        onChange={(e) => handlePrimaryCategoryChange(e.target.value)}
                        value={categories.find(cat => cat.id === primaryCategory)?.id || ""}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id} className="text-sm font-bold">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-3">
                    <label className="font-mono text-xs uppercase text-on-surface-variant tracking-wider">
                      次分類選取
                    </label>
                    <div className="">
                      
                    </div>
                    <RadixMultiSelect
                        options={categories.filter(cat => cat.id !== primaryCategory).map(category => ({
                            value: category.id,
                            label: category.name,
                        }))}
                        selected={selectSecCat}
                        onChange={handleSecondaryCategoryChange}
                        placeholder="選擇次分類..."
                        className="w-full border border-outline-variant rounded-xl p-4 space-y-2 bg-surface overflow-y-auto"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
    )  
}