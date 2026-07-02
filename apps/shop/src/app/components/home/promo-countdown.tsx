'use client';

import { useEffect, useState } from "react";
import { useOneTap } from "@repo/database/auth";

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

export function PromoCountdown() {
    useOneTap({
      clientId: process.env.GOOGLE_CLIENT_ID!, 
    })

    const [countdown, setCountdown] = useState<Countdown>({
        hours: "00",
        minutes: "00",
        seconds: "00",
      });   

      useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const target = new Date();
            target.setHours(23, 59, 59, 999);

            const diff = target.getTime() - now.getTime();
            if (diff <= 0) {
                setCountdown({ hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown({
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0"),
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-gutter">
        <div className="space-y-2">
          <h2 className="text-headline-lg font-headline-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
              timer
            </span>
              限時閃購倒數
          </h2>
          <p className="text-on-surface-variant">別錯過本週的專屬學生會員折扣！</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex gap-2">                  <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
            {countdown.hours}
          </div>
          <div className="text-primary text-headline-md flex items-center">:</div>
            <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
              {countdown.minutes}
            </div>
            <div className="text-primary text-headline-md flex items-center">:</div>
              <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
                {countdown.seconds}
             </div>
            </div>
          </div>
        </div>
      
    );

}