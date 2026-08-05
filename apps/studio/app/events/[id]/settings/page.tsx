"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";
import { mockEvents } from "../../../../src/mock/studioMockData";

export default function EventSettingsPage() {
  const params = useParams();
  const eventId = (params.id as string) || "CMP-2024-SPRING";
  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  const [title, setTitle] = useState(event.title);
  const [isPublished, setIsPublished] = useState(event.status === "進行中");
  const [links, setLinks] = useState(["https://instagram.com/summerfest"]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link
              href={`/events/${event.id}`}
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </Link>
            <div>
              <span className="text-xs uppercase font-bold text-outline tracking-wider">
                活動管理設定
              </span>
              <h1 className="text-2xl font-bold text-on-surface">
                {title} - 活動設定
              </h1>
            </div>
          </div>

          {/* General Information */}
          <section className="bg-surface-container rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-on-surface">基本資訊</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                  活動名稱
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface p-3 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                  活動網址 Slug
                </label>
                <div className="flex items-center bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden text-sm">
                  <span className="px-3 text-on-surface-variant font-mono text-xs border-r border-outline-variant/30">
                    https://event.studio/
                  </span>
                  <input
                    type="text"
                    defaultValue={event.id.toLowerCase()}
                    className="flex-1 bg-transparent p-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                  主辦組織
                </label>
                <select className="w-full bg-surface-container-low text-on-surface p-3 rounded-xl border border-outline-variant/30 focus:outline-none text-sm">
                  <option>學生會行政中心</option>
                  <option>獨立策展小組</option>
                </select>
              </div>
            </div>
          </section>

          {/* Status & Links */}
          <section className="bg-surface-container rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-on-surface">發佈狀態與社群連結</h2>

            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div>
                <h3 className="text-sm font-semibold text-on-surface">
                  對外公開發佈
                </h3>
                <p className="text-xs text-on-surface-variant">
                  開啟後，此活動將公開供學生造訪報名。
                </p>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">
                外部連結
              </label>
              <div className="space-y-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 text-sm"
                  >
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      link
                    </span>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[idx] = e.target.value;
                        setLinks(newLinks);
                      }}
                      className="flex-1 bg-transparent outline-none"
                    />
                    <button
                      onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setLinks([...links, "https://"])}
                  className="w-full py-2.5 border-2 border-dashed border-outline-variant/40 hover:border-primary rounded-xl text-xs font-bold text-on-surface-variant hover:text-primary flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  新增外部連結
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => alert("變更已成功儲存")}
                className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                儲存變更
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-500/5 rounded-2xl p-6 border border-red-500/20 space-y-3">
            <h2 className="text-base font-bold text-red-600">危險區域</h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-red-500/10 p-4 rounded-xl">
              <div>
                <h3 className="text-sm font-semibold text-red-700">
                  刪除此活動
                </h3>
                <p className="text-xs text-red-600/80">
                  此動作無法復原，所有相關報名與訂單資料將被永久刪除。
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm("確定要刪除此活動嗎？")) {
                    alert("活動已成功刪除");
                  }
                }}
                className="bg-red-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-red-700 transition-colors shrink-0"
              >
                刪除活動
              </button>
            </div>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
