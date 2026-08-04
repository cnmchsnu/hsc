"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  altText?: string;
  onClose: () => void;
}

export function ImageModal({
  isOpen,
  imageUrl,
  altText = "放大圖片",
  onClose,
}: ImageModalProps) {
  // 監聽 Esc 鍵關閉 & 阻止背景頁面捲動
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // 鎖定背景捲動
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // 若未開啟或無圖片網址則不渲染
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose} // 點擊背景任意處皆可關閉
    >
      {/* 右上角關閉按鈕 X */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
        aria-label="關閉"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 圖片容器：設定 maximum size 確保圖片不超出螢幕 */}
      <div
        className="relative max-w-full max-h-full w-auto h-auto flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // 避免點擊圖片本身時觸發背景關閉
      >
        <img
            src={imageUrl}
            alt={altText}
            className="max-w-full max-h-[90vh] object-contain rounded-sm select-none shadow-2xl"
            width={800}
            height={800}
            loading="lazy"
        />
      </div>
    </div>
  );
}