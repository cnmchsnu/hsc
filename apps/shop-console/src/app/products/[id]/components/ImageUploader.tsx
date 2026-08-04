"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

import { ProductImage } from "@repo/commerce/domain";
import { ProductManageDetail } from "@repo/commerce/application";

interface ImageUploaderProps {
    images: ProductImage[];
    onUploaded: React.Dispatch<React.SetStateAction<ProductImage[]>>;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}


export function ImageUploader({ images, onUploaded, onChange }: ImageUploaderProps)  {
    // State to keep track of the current upload progress (percentage)
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false); // 拖曳中懸浮狀態
    const [isUploading, setIsUploading] = useState(false); // 上傳中狀態
    const [error, setError] = useState<string | null>(null); // 錯誤訊息狀態

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     *
     * This function calls the authentication API endpoint to receive upload parameters like signature,
     * expire time, token, and publicKey.
     *
     * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
     * @throws {Error} Throws an error if the authentication request fails.
     */
    const authenticator = async (): Promise<{ signature: string; expire: number; token: string; publicKey: string; }> => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
    const handleUpload = async (targetFile?: File) => {
        // Access the file input element using the ref
        const file = targetFile || fileInputRef.current?.files?.[0];
        if (!file || !file.type.startsWith("image/")) {
            setError("請選擇有效的圖片檔案。");
            return;
        }
       
        setIsUploading(true);
        setProgress(0);
        setError(null); // Clear any previous errors

        // Extract the first file from the file input

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            const uploadedImage: ProductImage = {
                productId: "",
                id: uploadResponse.fileId!,
                url: uploadResponse.url!,
                alt: file.name,
                isPrimary: false, // Default to false; can be updated later
                displayOrder: images.length, // Default display order; can be updated later
            };

            
            onUploaded([...images, uploadedImage]);
            onChange((prevData) => ({
                ...prevData,
                images,
            }));


            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset the file input after successful upload

        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
                setError("上傳已取消。");
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
                setError("上傳失敗，請檢查檔案格式或大小是否符合要求。");
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
                setError("上傳失敗，請檢查網路連線或稍後再試。");
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
                setError("伺服器錯誤，請稍後再試。");
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
                setError("上傳失敗，請稍後再試。");
            }
        }

        setIsUploading(false);
    };
    // 2. 觸發隱藏的 file input
    const handleClick = () => {
        if (isUploading) return; // 上傳中不允許重複點擊
        fileInputRef.current?.click();
    };

    // 5. 拖曳事件處理 (Drag & Drop)
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isUploading) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (isUploading) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    return (
        <div className="w-full  mx-auto">
        {/* 隱藏的原生 File Input */}
        <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    handleUpload(file);
                }
            }}
            accept="image/*"
            className="hidden"
        />

        {/* 可拖曳與點擊的上傳區域 Block */}
        <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            isDragging
                ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]"
                : "border-outline-variant hover:border-on-primary-fixed-variant hover:bg-surface"
            } ${isUploading ? "cursor-not-allowed pointer-events-none" : ""}`}
        >
            {/* 狀態 A：尚未上傳 / 拖曳中 */}
            {!isUploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                {isDragging ? "file_download" : "add_photo_alternate"}
                </span>
                <div className="text-sm font-bold text-on-surface-variant">
                {isDragging ? (
                    <span className="text-indigo-600">放開以開始上傳圖片</span>
                ) : (
                    <>
                    <span>點擊或將圖片拖曳至此處</span>
                    <p className="text-xs font-normal text-gray-400 mt-1">
                        支援 PNG, JPG 等格式
                    </p>
                    </>
                )}
                </div>
            </div>
            ) : (
            /* 狀態 B：上傳中 (顯示進度條) */
            <div className="flex flex-col items-center justify-center gap-3 py-2 animate-in fade-in">
                <span className="material-symbols-outlined text-3xl text-indigo-600 animate-bounce">
                cloud_upload
                </span>
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>圖片上傳中...</span>
                        <span>{progress}%</span>
                    </div>

                    {/* 進度條 */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                        className="h-full bg-indigo-600 transition-all duration-150 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                        />
                    </div>
                    {error && (
                        <div className="text-sm text-red-500">
                            {error}
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
        </div>
    );
};
