"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, ArrowRight, X, Menu } from "lucide-react";
import { FacebookIcon, ZaloIcon } from "@/components/icons/PlatformIcons";

const NAV_LEFT = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/cua-hang" },
];

const NAV_RIGHT = [
  { label: "Ưu đãi", href: "/uu-dai" },
  { label: "Hướng dẫn", href: "/huong-dan" },
  { label: "FAQ", href: "/faq" },
];

const NAV_LINKS = [...NAV_LEFT, ...NAV_RIGHT];

export function MarketingHeader({ activePath = "/" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* ── Utility strip ── */}
      <div className="hidden md:block bg-primary/95 backdrop-blur-sm text-white">
        <div className="max-w-[1200px] mx-auto px-10 h-8 flex items-center justify-between text-[11.5px] font-semibold tracking-wide">
          <a
            href="tel:0965965439"
            className="flex items-center gap-xs hover:opacity-80 transition-opacity"
          >
            <Phone size={11} strokeWidth={2.5} />
            Hotline 0965.965.439
          </a>
          <div className="flex items-center gap-lg">
            <a
              href="https://zalo.me/0898204657"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs hover:opacity-80 transition-opacity"
            >
              <ZaloIcon size={14} /> Zalo
            </a>
            <a
              href="https://www.facebook.com/layeu.chicothe.169"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs hover:opacity-80 transition-opacity"
            >
              <FacebookIcon size={14} /> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-primary/10 shadow-sm shadow-primary/5">
        <nav className="max-w-[1200px] mx-auto px-5 md:px-10 h-[60px] grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center">

          {/* Left: nav links */}
          <div className="hidden md:flex items-center gap-xl">
            {NAV_LEFT.map(({ label, href }) => {
              const isActive = activePath === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-[14px] font-semibold transition-colors duration-200 group ${
                    isActive ? "text-primary" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-[2px] left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Logo — centered */}
          <Link
            href="/"
            className="flex items-center gap-sm hover:opacity-90 transition-opacity justify-self-start md:justify-self-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm scale-110" />
              <img
                src="/nhimchaomung.png"
                alt="Nhím"
                className="relative w-9 h-9 object-cover rounded-full ring-2 ring-primary/20"
              />
            </div>
            <span className="font-black text-primary text-[17px] tracking-tight">Nhím</span>
          </Link>

          {/* Right: nav links + CTA + hamburger */}
          <div className="flex items-center justify-end gap-xl">
            <div className="hidden md:flex items-center gap-xl">
              {NAV_RIGHT.map(({ label, href }) => {
                const isActive = activePath === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative text-[14px] font-semibold transition-colors duration-200 group ${
                      isActive ? "text-primary" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-[2px] left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* CTA */}
              <Link
                href="/login"
                className="group flex items-center gap-xs bg-primary hover:bg-primary-active text-white text-[13px] font-black px-lg py-[7px] rounded-full shadow-md shadow-primary/30 transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-primary/35 active:scale-95 whitespace-nowrap"
              >
                Đăng nhập
                <ArrowRight size={13} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-xl border-b border-primary/10 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-md gap-xs">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-[15px] font-semibold py-sm px-md rounded-xl transition-colors duration-200 ${
                  isActive
                    ? "text-primary bg-primary/8 font-bold"
                    : "text-ink/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-sm flex items-center justify-center gap-sm bg-primary text-white text-[14px] font-black py-sm px-lg rounded-2xl shadow-md shadow-primary/25 transition-all hover:bg-primary-active"
          >
            Đăng nhập
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>

          <div className="mt-sm pt-sm border-t border-primary/10 flex items-center justify-center gap-xl pb-xs">
            <a
              href="https://zalo.me/0898204657"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs text-[12px] font-semibold text-ink/50 hover:text-primary transition-colors"
            >
              <ZaloIcon size={16} /> Zalo
            </a>
            <a
              href="https://www.facebook.com/layeu.chicothe.169"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs text-[12px] font-semibold text-ink/50 hover:text-primary transition-colors"
            >
              <FacebookIcon size={16} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
