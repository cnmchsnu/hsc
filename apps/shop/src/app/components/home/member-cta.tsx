


export function BentoCTA() {
    
return (
  <section className="py-stack-lg bg-surface">
    <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bento-grid">
      <div className="col-span-12 md:col-span-8 bg-primary rounded-3xl p-stack-lg flex flex-col justify-center text-on-primary min-h-[300px] relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-headline-lg font-headline-lg mb-4 font-bold">
            加入特約會員
            <br />
            享全館 9 折優惠
          </h2>
          <p className="text-primary-fixed mb-8">
            驗證師大附中學生信箱，即可立即升等為特約會員，參與專屬預購活動與積點回饋。
          </p>
          <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 text-sm w-fit">
            立即驗證身份 <span className="material-symbols-outlined">verified_user</span>
          </button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-surface-container-high rounded-3xl p-stack-lg flex flex-col justify-center items-center text-center shadow-md border border-outline-variant relative overflow-hidden">
        <span className="material-symbols-outlined text-6xl text-primary mb-4">local_shipping</span>
        <h3 className="font-bold text-primary text-xl mb-2">校內取貨免運費</h3>
        <p className="text-on-surface-variant text-sm">線上訂購，可至學生會辦公室直接領取，省去運費更快速。</p>
      </div>
    </div>
  </section>
);

}