'use client';

import { useRef, useState } from "react";

import { ProductManageDetail } from "@repo/commerce/application";

import { updateProductBasicAction, checkSlugAction } from "@/actions/commerce"

import { set, useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  slug: string;
  description: string;
}

interface GeneralProps {
    productData: ProductManageDetail;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}

export function General({ productData, onChange }: GeneralProps) {
    const [collapsedCard, setCollapsedCard] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [product, setProduct] = useState(productData.product);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);
      onChange({ ...productData, product: { ...productData.product, name: product.name, slug: product.slug, description: product.description } });
        try {
            await updateProductBasicAction(product);
            setSuccessMessage("商品基本資訊已成功更新！");
        }
        catch (error) {
            console.error("更新商品基本資訊時發生錯誤:", error);
            setError("更新商品基本資訊時發生錯誤，請稍後再試。");
        }
      setIsSaving(false);
      timerRef.current = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    };

    const handleSlugValidation = async (slug: string) => {
        setIsValidating(true);
        const exists = await checkSlugAction(slug);
        setIsValidating(false);
        return exists ? "此 Slug 已存在，請選擇其他名稱。" : true;
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        onChange({ ...productData, product: { ...productData.product, name: newName } });
    }
    
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSlug = e.target.value;
        onChange({ ...productData, product: { ...productData.product, slug: newSlug.replace(/\s+/g, '-') } });
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        onChange({ ...productData, product: { ...productData.product, description: newDescription } });
    }

    const {
      register,
      formState: { errors, touchedFields },
    } = useForm<FormInputs>({
      mode: "onBlur", // 👈 選擇觸發時機：'onBlur' (離開焦點時) 或 'onChange' (打字時)
    });

    return (
        <form className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
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
                    基本資訊
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    商品的基礎辨識資訊與商城展示描述內容。
                  </p>
                </div>
              </div>
              {error && <span className="text-error text-sm">{error}</span>}
              {successMessage && <span className="text-success text-sm">{successMessage}</span>}
              {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
              {!isSaving && (
              <button
                type="button"
                className={`px-4 py-2  text-on-primary-fixed-variant font-bold rounded-xl transition-colors text-sm${
                          isSaving || productData.product === product ? 'cursor-not-allowed bg-surface-container-low' : 'bg-surface-container hover:bg-surface-container-high'
                        }`}
                onClick={handleSave}
                disabled={isSaving || productData.product === product}
              >
                儲存基本資訊
              </button>
              )}
            </div>
            {!collapsedCard && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-8"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-sm text-on-surface-variant">
                        商品名稱<span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("name", {
                          required: "商品名稱為必填欄位",
                        })}
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20"
                        type="text"
                        required
                        value={productData.product.name}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      網址路徑 (URL Slugs) <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <input
                        {...register("slug", {
                          required: "網址路徑為必填欄位",
                          validate: async (value) => {
                            return await handleSlugValidation(value);
                          },
                        })}
                        className={`w-full px-4 py-3 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20 ${
                          !!productData.product.id ? 'cursor-not-allowed bg-surface-container-low' : 'bg-surface'
                        }`}
                        disabled={!!productData.product.id}
                        required
                        type="text"
                        value={productData.product.slug}
                        onChange={handleSlugChange}
                      />
                      {isValidating && (
                        <span className="absolute right-3 top-2.5 text-xs text-gray-400 animate-pulse">
                          檢查中...
                        </span>
                      )}
                      {errors.slug && (
                        <p className="text-xs text-error mt-1">{errors.slug.message}</p>
                      )}

                      {/* 當通過驗證且沒有錯誤時，顯示綠色勾勾提示 */}
                      {!errors.slug && !isValidating && touchedFields.slug && (
                        <p className="text-xs text-green-600 mt-1">✓ 可以使用！</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      商品描述
                    </label>
                    <textarea
                      {...register("description")}
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20"
                      rows={4}
                      value={product.description! }
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      狀態
                    </label>
                    <div className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface-variant cursor-not-allowed flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">
                        lock
                      </span>
                      <span>{product.status === 'draft' ? '草稿' : product.status === 'active' ? '已發布' : '已封存'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>

    );

}