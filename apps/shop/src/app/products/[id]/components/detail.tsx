'use client'

import { useState } from "react";

export function Detail() {

    const [activeTab, setActiveTab] = useState<"detail" | "delivery" | "service">("detail");

    return (
              <div className="mt-24">
        <div className="border-b border-surface-variant flex gap-8 mb-stack-lg">
          <button
            onClick={() => setActiveTab("detail")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "detail" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            商品詳情
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "delivery" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            運送政策
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "service" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            售後服務
          </button>
        </div>

        {activeTab === "detail" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-200">
            <div className="lg:col-span-2 space-y-stack-lg">
              <div className="prose prose-on-surface max-w-none">
                <h4 className="text-xl font-bold mb-4">材質與工藝</h4>
                <p className="mb-6">
                  本產品選用優質新疆長絨棉，經過精密梳棉程序，排除雜質與短纖維，確保織物表面細膩平滑。400g/㎡ 的重磅厚度，不僅提供了優異的保暖性能，更能維持洗滌後不易變形的硬挺廓形。
                </p>
                <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant">
                  <h5 className="font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">info</span>
                    產品規格
                  </h5>
                  <ul className="space-y-2 font-label-md text-on-surface-variant">
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>面料：</span>
                      <span>100% 重磅純棉</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>版型：</span>
                      <span>寬鬆直筒 (Relaxed Fit)</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>工藝：</span>
                      <span>3D 複合立體電繡</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>細節：</span>
                      <span>定染色織抽繩、雙層加厚帽兜</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-stack-lg">
              <div className="bg-surface-container-high p-stack-lg rounded-2xl">
                <h4 className="font-bold mb-4 text-on-primary-fixed-variant">購買須知</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">
                      local_shipping
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">校內取貨免運</p>
                      <p className="text-on-surface-variant">可於學生會辦公室直接領取</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">security</span>
                    <div className="text-sm">
                      <p className="font-bold">正品保證</p>
                      <p className="text-on-surface-variant">學生會官方授權，保證校園正品</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">
                      assignment_return
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">七天鑑賞期</p>
                      <p className="text-on-surface-variant">包裝完整可享退換貨服務</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant animate-in fade-in duration-200">
            <h4 className="text-xl font-bold mb-4">校內取貨說明</h4>
            <p className="mb-4">下單完成後，商品將於 3-5 個工作天內配送至學生會辦公室。屆時您將收到取貨簡訊或 Email 通知，即可憑下單編號至辦公室領取商品。</p>
            <p className="mb-2">取貨時間：每週一至週五 12:00 - 13:30 / 16:30 - 18:00</p>
            <p>取貨地點：學生活動中心 2 樓學生會辦公室</p>
          </div>
        )}

        {activeTab === "service" && (
          <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant animate-in fade-in duration-200">
            <h4 className="text-xl font-bold mb-4">售後與換貨服務</h4>
            <p className="mb-4">我們提供 7 天的鑑賞期服務。收到商品 7 天內，若尺寸不合或有瑕疵，在吊牌未剪、商品包裝完整且未經洗滌的情況下，均可辦理退換貨。</p>
            <p>若有任何退換貨需求，請與學生會客服信箱聯繫，或直接於取貨時間前來學生會辦公室洽詢。</p>
          </div>
        )}
      </div>
    )
}