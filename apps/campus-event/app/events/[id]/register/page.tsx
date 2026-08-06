"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCheck, ArrowRight } from "lucide-react";
import { MOCK_EVENTS } from "@/mock/eventMockData";

export default function EventRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id) || MOCK_EVENTS[0];

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "資訊工程學系",
    email: "",
    phone: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/checkout?eventId=${event.id}&name=${encodeURIComponent(formData.fullName)}`);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-outline transition-all";

  return (
    <div className="w-full min-h-screen bg-background pb-20 pt-6">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Top Title Card */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
            <UserCheck className="w-4 h-4" />
            EVENT REGISTRATION FORM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            活動報名資料填寫
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            目標活動：<span className="font-semibold text-on-surface">{event.title}</span> ({event.date})
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-8 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
              真實姓名 <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="請輸入姓名"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
                學號 / 工號 <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例如: B11902001"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
                所屬科系 / 單位
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className={inputClass}
              >
                <option value="資訊工程學系">資訊工程學系</option>
                <option value="電機工程學系">電機工程學系</option>
                <option value="企業管理學系">企業管理學系</option>
                <option value="校友 / 外校嘉賓">校友 / 外校嘉賓</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
                電子信箱 <span className="text-error">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="student@mail.edu.tw"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
                連絡電話
              </label>
              <input
                type="tel"
                placeholder="0912-345-678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
              特殊需求或備註
            </label>
            <textarea
              rows={3}
              placeholder="如有飲食需求或身障協助請在此註明..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">
              送出後將轉往確認與付款頁面
            </span>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary hover:opacity-90 text-on-primary font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              送出並前往付款
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
