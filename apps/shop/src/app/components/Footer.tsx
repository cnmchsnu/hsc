import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant mt-auto">
      <div className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg mb-stack-lg">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-headline-sm font-headline-sm font-bold text-primary block mb-4">
              學生會商城
            </Link>
            <p className="text-on-surface-variant text-body-md mb-6">
              師大附中學生會唯一官方授權平台，致力於提供高品質的校園生活週邊商品。
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                href="#"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-gutter">
            <div>
              <h4 className="font-bold text-primary mb-4">快速連結</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="/products">
                    所有商品
                  </Link>
                </li>
                <li>
                  <Link className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#">
                    最新動態
                  </Link>
                </li>
                <li>
                  <Link className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="/profile">
                    會員中心
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">服務與支援</h4>
              <ul className="space-y-2">
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#">
                    聯繫我們
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#">
                    服務條款
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#">
                    隱私政策
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">校方資源</h4>
              <ul className="space-y-2">
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="https://www.hs.ntnu.edu.tw/" target="_blank" rel="noreferrer">
                    師大附中官網
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant text-label-md hover:text-primary underline transition-all" href="#" target="_blank" rel="noreferrer">
                    學生會 Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 學生會商城. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-on-surface-variant">Payment Method:</span>
            <span className="material-symbols-outlined text-on-surface-variant">payments</span>
            <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
