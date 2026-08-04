'use client';

import { useRef, useState } from "react";

import { ProductManageDetail } from "@repo/commerce/application";
import { ProductImage } from "@repo/commerce/domain";

import { updateImagesAction } from "@/actions/commerce"

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { ImageModal } from "./MediaZoom";

interface MediaProps {
    productData: ProductManageDetail;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}


import { ImageUploader } from "./ImageUploader";

export function Media({ productData, onChange }: MediaProps) {

    const [collapsedCard, setCollapsedCard] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [images, setImages] = useState<ProductImage[]>(productData.images);
    const timerRef = useRef<NodeJS.Timeout | null>(null);


    const handleImageAltChange = (imgurl: string, newAlt: string) => {
        const updatedImages = productData.images.map((img) =>
            img.url === imgurl ? { ...img, alt: newAlt } : img
        );
        
        setImages(updatedImages);
        onChange({ ...productData, images: updatedImages });
    }

    const handleOnDragEnd = (result: DropResult) => {
        // 如果拖到有效區域之外，直接返回
        if (!result.destination) return;

        // 複製一份新的陣列
        const reorderedItems = Array.from(images);
        // 將被拖動的項目從原位置移除
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        // 將項目插入到新的位置
        reorderedItems.splice(result.destination.index, 0, movedItem);

        // 更新 State
        setImages(reorderedItems.map((item, index) => ({ ...item, isPrimary: index === 0, displayOrder: index })));
        onChange({ ...productData, images: images });
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.stopPropagation();
        setImages(images.filter(img => img.url !== url));
        onChange({ ...productData, images: images.filter(img => img.url !== url) });

    }

    const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setError(null);
        setSuccessMessage(null);
        setIsSaving(true);
        try {
            console.log("Saving images:", images);
            await updateImagesAction({ productId: productData.product.id, images: images.map(img => ({
                productId: productData.product.id,
                id: img.id,
                url: img.url,
                isPrimary: img.isPrimary,
                alt: img.alt,
                displayOrder: img.displayOrder
            }))});
            console.log("Images saved successfully:", images);
            onChange({ ...productData, images });
            setSuccessMessage("圖片已成功更新！");
        } catch (error) {
            setError("發生錯誤，請稍後再試。");
        }
        setIsSaving(false);
        timerRef.current = setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };


    return (
       <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant">
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
                    商品圖片
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    管理此商品的圖片。
                  </p>
                </div>
              </div>
              {error && <span className="text-error text-sm">{error}</span>}
              {successMessage && <span className="text-success text-sm">{successMessage}</span>}
              {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
              {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
              {!isSaving && (
                <button
                    type="button"
                    className={`px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl transition-colors text-sm${
                          isSaving ||  productData.images === images || !productData.product.id ? 'cursor-not-allowed bg-surface-container-low' : 'bg-surface-container hover:bg-surface-container-high'
                        }`}
                    onClick={handleSaveChanges}
                    title={isSaving ||  productData.images === images || !productData.product.id ? "無變更可儲存" : "儲存圖片順序"}
                    disabled={isSaving ||  productData.images === images || !productData.product.id}
                >
                    儲存變更
                </button>
                )}
            </div>
            {!collapsedCard && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-8"></div>
                <div className="space-y-4">
                   <DragDropContext onDragEnd={handleOnDragEnd}>
                        {/* 1. 列表維持水平方向 */}
                        <Droppable droppableId="todolist">
                            {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-col w-full gap-4 p-4 border border-outline-variant rounded-2xl items-start overflow-x-auto min-h-[140px]"
                            >
                                {images.map((img, index) => (
                                <Draggable
                                    key={img.id}
                                    draggableId={img.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        /* 2. 卡片內部全部改成 flex-row (橫向) 並且垂直對齊 items-center */
                                        className={`flex flex-row items-center gap-3 p-3 rounded-xl bg-white w-full shadow-sm border transition-all select-none shrink-0 ${
                                        snapshot.isDragging
                                            ? "shadow-lg ring-2 ring-indigo-500 bg-indigo-50/50 scale-105"
                                            : "border-gray-200"
                                        }`}
                                    >
                                        {/* A. 拖動手把 */}
                                        <div
                                        {...provided.dragHandleProps}
                                        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 shrink-0"
                                        >
                                        <span className="material-symbols-outlined text-xl">drag_indicator</span>
                                        </div>

                                        {/* B. 圖片預覽區 */}
                                        <div
                                        className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant relative cursor-pointer"
                                        onClick={() => setSelectedImage(img.id)}
                                        >
                                        <img
                                            src={img.url}
                                            alt={img.alt}
                                            
                                            className="object-cover"
                                            
                                            loading="lazy"
                                        />
                                        </div>

                                        {/* C. 輸入框區塊 (自動佔滿剩餘寬度 flex-1) */}
                                        <div className="flex-1 min-w-0">
                                            <input
                                                className="w-full px-3 py-1.5 bg-surface rounded-xl border border-outline-variant text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 truncate"
                                                type="text"
                                                placeholder="替代文字 (Alt)"
                                                value={img.alt}
                                                onChange={(e) => handleImageAltChange(img.url, e.target.value)}
                                            />
                                        </div>

                                        {/* D. 右側操作區 (主圖標籤 + 刪除按鈕) */}
                                        <div className="flex items-center gap-2 shrink-0">
                                        {index === 0 && (
                                            <span className="text-sm font-bold px-2 py-0.5 bg-surface-container text-on-surface-container rounded-md shrink-0">
                                            主圖
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            className="p-1 text-error hover:cursor-pointer hover:bg-error-container/20 rounded-lg transition-colors"
                                            onClick={(e) => handleDelete(e, img.url)}
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                        </div>

                                        {/* 圖片放大 Modal */}
                                        <ImageModal
                                        isOpen={selectedImage === img.id}
                                        imageUrl={img.url}
                                        altText={img.alt}
                                        onClose={() => setSelectedImage("")}
                                        />
                                    </li>
                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                            )}
                        </Droppable>
                        </DragDropContext>
                    <ImageUploader
                        images={images}
                        onUploaded={setImages}
                        onChange={onChange}
                    />
                </div>
              </div>
            )}
          </div>
    )  
}