"use client";

import { useState } from "react";
import Button from "../ui/Button";

type ServiceCardProps = {
  title: string;
  price: string;
  time: string;
  description: string;
  included: string[];
  addOns?: string[];
  popular?: boolean;
};

export default function ServiceCard({
  title,
  price,
  time,
  description,
  included,
  addOns = [],
  popular = false,
}: ServiceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white transition duration-300 hover:-translate-y-2 hover:border-[#FFD100]/70">
      {popular && (
        <div className="absolute right-6 top-6 rounded-full bg-[#FFD100] px-4 py-1 text-xs font-black uppercase text-black">
          Most Popular
        </div>
      )}

      <h3 className="text-4xl font-black uppercase leading-tight">{title}</h3>

      <p className="mt-5 text-7xl font-black text-[#FFD100]">{price}</p>

      <p className="mt-3 text-lg font-semibold uppercase tracking-wide text-gray-300">
        {time}
      </p>

      <p className="mt-8 text-xl leading-9 text-gray-300">{description}</p>

      <button
        onClick={() => setOpen(!open)}
        className="mt-8 text-lg font-bold uppercase tracking-wider text-[#FFD100] transition hover:text-white"
      >
        {open ? "Hide Details ▲" : "What’s Included ▼"}
      </button>

      {open && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="font-bold uppercase text-white">Included</p>

          <ul className="mt-4 space-y-3 text-gray-300">
            {included.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>

          {addOns.length > 0 && (
            <>
              <p className="mt-6 font-bold uppercase text-white">
                Optional Add-ons
              </p>

              <ul className="mt-4 space-y-3 text-gray-300">
                {addOns.map((item) => (
                  <li key={item}>+ {item}</li>
                ))}
              </ul>
            </>
          )}

          <Button href="/booking" className="mt-8 w-full">
            Book This Service
          </Button>
        </div>
      )}
    </div>
  );
}