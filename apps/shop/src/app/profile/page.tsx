
import { getCurrentUser } from "@repo/auth/server";
import { redirect } from 'next/navigation';

import { PersonnalData, Actions } from "./components/";


interface Order {
  id: string;
  date: string;
  total: number;
  status: "待配貨" | "可取貨" | "已完成";
}

export default async function UserProfile() {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login")
  }

  const userProfile = currentUser?.userContext;


  const orders: Order[] = [
    { id: "#HSNU-2024-0082", date: "2024/03/15", total: 1280, status: "待配貨" },
    { id: "#HSNU-2024-0075", date: "2024/02/28", total: 450, status: "可取貨" },
    { id: "#HSNU-2024-0012", date: "2024/01/10", total: 2100, status: "已完成" },
  ];

  const getStatusStyle = (status: Order["status"]) => {
    if (status === "待配貨") return "bg-blue-100 text-blue-700";
    if (status === "可取貨") return "bg-amber-100 text-amber-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Identity & Membership */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* User Identity Header */}
          <section className="bento-card bg-surface rounded-xl p-stack-lg flex flex-col items-center text-center border border-outline-variant shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="relative w-32 h-32 mb-stack-md">
              <div className="w-full h-full rounded-full border-4 border-white shadow-md overflow-hidden bg-surface-container">
                { userProfile?.profile?.avatarUrl ? ( <img src={userProfile.profile.avatarUrl!} width="128" height="128" />) : <span></span> }
              </div>
              {/* <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-container transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-sm font-bold">edit</span>
              </button> */}
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">{userProfile?.profile?.displayName}</h1>
            {/* <p className="font-label-md text-label-md text-text-secondary mt-1">學號：{userProfile?.profile?.studentId}</p> */}
            {/* <div className="mt-stack-md flex gap-stack-sm flex-wrap justify-center">
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-primary font-bold">
                高二 誠班
              </span>
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-primary font-bold">
                校慶籌備組
              </span>
            </div> */}
          </section>

          {/* Membership Status Card */}
          {/* <section className="bento-card bg-primary-container text-white rounded-xl p-stack-lg relative overflow-hidden border border-outline-variant shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary-container opacity-20 blur-3xl rounded-full"></div>
            <div className="flex items-start justify-between mb-stack-md relative z-10">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 text-xs">
                  Membership Status
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-xl mt-1">榮譽學生會會員</h2>
              </div>
              <span
                className="material-symbols-outlined text-4xl text-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            </div>
            <div className="bg-black/10 rounded-lg p-4 mb-stack-md relative z-10 text-sm">
              <p className="font-body-md text-body-md leading-relaxed">
                專屬特權：享全館 <span className="text-secondary-container font-bold">9 折</span> 優惠，及優先預購權。
              </p>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm relative z-10 text-xs">
              <span>有效期限至 2025/06/30</span>
              <a className="text-secondary-container underline underline-offset-4 hover:opacity-80 transition-opacity" href="#">
                續費詳情
              </a>
            </div>
          </section> */}

          {/* Settings & Actions */}
          <Actions />
        </div>

        {/* Right Column: Form & History */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Personal Information Form */}

          <PersonnalData {...userProfile} />

          {/* Order History Table */}
          <section className="bento-card bg-white rounded-xl p-stack-lg border border-outline-variant shadow-sm hover:scale-[1.01] transition-transform duration-200 overflow-hidden">
            <div className="flex items-center justify-between mb-stack-lg px-2">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">歷史訂單紀錄</h2>
              <a className="text-primary font-label-md hover:underline text-sm font-bold" href="#">
                查看全部
              </a>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-outline-variant">
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">
                      訂單編號
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">日期</th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">金額</th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">狀態</th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 font-label-sm text-label-sm font-bold">{order.id}</td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant">{order.date}</td>
                      <td className="p-4 font-body-md text-body-md font-bold">NT$ {order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm text-xs font-bold ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-primary hover:scale-110 transition-transform p-1">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
