"use client";

export function Header() {
  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-40 px-xl flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-md text-outline">
            search
          </span>
          <input
            type="text"
            placeholder="搜尋活動、訂單或指標..."
            className="w-full bg-surface-container-low border-none rounded-full pl-xl py-sm text-body-sm focus:ring-1 focus:ring-primary outline-none transition-all text-sm px-4 py-2 pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-lg ml-xl">
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
}
