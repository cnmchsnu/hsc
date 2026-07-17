"use client";

import { useState } from "react";
import { updateCurrentProfile } from "./action";



export function PersonnalData(userData: any) {
    const [name, setName] = useState(userData.profile?.displayName);
    const [phone, setPhone] = useState("0912-345-678");
    const [classNum, setClassNum] = useState(userData.profile?.class)
    const [number, setnumber] = useState(userData.profile?.number)
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        updateCurrentProfile({
            id: userData.profile.user_id,
            displayName: name,
            class: classNum,
            number
        }).then(() => {
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        });
    };

    return (
            <section className="bento-card bg-white rounded-xl p-stack-lg border border-outline-variant shadow-sm hover:scale-[1.01] transition-transform duration-200">
                <form onSubmit={handleSave}>

                    <div className="flex items-center justify-between mb-stack-lg flex-wrap gap-4">
                        <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">個人基本資料</h2>
                            <div className="flex items-center gap-2">
                            {saved && <span className="text-secondary text-sm font-bold">✓ 儲存成功</span>}
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-md hover:bg-primary-container transition-all active:scale-95 shadow-sm disabled:opacity-50 font-bold text-sm"
                            >
                                <span className="material-symbols-outlined text-sm font-bold">save</span>
                                {saving ? "儲存中..." : "儲存變更"}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                        {userData.profile?.finalClassification === "student" && (
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant block">班級</label>
                                <input
                                    className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all"
                                    type="text"
                                    value={classNum}
                                    onChange={(e) => setClassNum(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        {userData.profile?.finalClassification === "student" && (
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant block">座號</label>
                                <input
                                    className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all"
                                    type="text"
                                    value={number}
                                    onChange={(e) => setnumber(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant block">姓名</label>
                            <input
                                className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant block">學號</label>
                            <input
                                className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all cursor-not-allowed"
                                type="text"
                                value={userData.profile?.studentId ?? "-"}
                                required
                                disabled={true}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant block">手機號碼</label>
                            <input
                                className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant block">信箱</label>
                            <input
                                className="w-full bg-surface border border-outline-variant/60 focus:border-primary rounded-lg p-3 font-body-md text-on-surface outline-none transition-all cursor-not-allowed"
                                type="text"
                                value={userData.user?.email ?? ""}
                                required
                                disabled={true}
                            />
                        </div>
                    </div>
                </form>
            </section>

    )



}