import Link from "next/link";
import { Phone } from "lucide-react";
import { FacebookIcon, ZaloIcon } from "@/components/icons/PlatformIcons";

const SOCIAL_LINKS = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/layeu.chicothe.169", Icon: FacebookIcon },
  { key: "zalo", label: "Zalo", href: "https://zalo.me/0898204657", Icon: ZaloIcon },
];

const PRODUCT_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/cua-hang" },
  { label: "Ưu đãi", href: "/uu-dai" },
  { label: "Hướng dẫn", href: "/huong-dan" },
];

const SUPPORT_LINKS = [
  { label: "Câu hỏi thường gặp", href: "/faq" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
];

export function MarketingFooter() {
  return (
    <footer className="relative bg-ink text-white">
      {/* Diagonal divider instead of a plain top border */}
      <svg
        className="block w-full h-[36px] text-canvas-soft"
        viewBox="0 0 1200 36"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,36 1200,0 1200,36" fill="currentColor" />
      </svg>

      <div className="max-w-[1200px] mx-auto px-lg py-2xl grid grid-cols-2 md:grid-cols-4 gap-2xl">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-md">
          <div className="flex items-center gap-sm">
            <img src="/nhimchaomung.png" alt="Nhím" className="h-10 w-10 object-cover rounded-full shadow-sm" />
            <span className="text-[20px] font-black text-white tracking-tight">Nhím</span>
          </div>
          <p className="text-white/60 text-[13px] leading-relaxed">
            Nền tảng hoàn tiền affiliate cho Shopee tại Việt Nam.
          </p>
          <div className="flex items-center gap-sm pt-xs">
            {SOCIAL_LINKS.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="space-y-sm">
          <h5 className="font-black text-[13px] uppercase tracking-wide text-white/50">Sản phẩm</h5>
          <ul className="space-y-sm text-[14px] font-medium">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.href}>
                <Link className="text-white/75 hover:text-primary transition-colors" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div className="space-y-sm">
          <h5 className="font-black text-[13px] uppercase tracking-wide text-white/50">Hỗ trợ</h5>
          <ul className="space-y-sm text-[14px] font-medium">
            {SUPPORT_LINKS.map((l) => (
              <li key={l.href}>
                <Link className="text-white/75 hover:text-primary transition-colors" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="space-y-sm">
          <h5 className="font-black text-[13px] uppercase tracking-wide text-white/50">Liên hệ</h5>
          <a href="tel:0965965439" className="flex items-center gap-xs text-[14px] font-bold text-white hover:text-primary transition-colors">
            <Phone size={14} strokeWidth={2.5} />
            0898204657
          </a>
          <div className="flex flex-col gap-sm pt-xs">
            <Link href="/register" className="rounded-lg bg-primary px-md py-sm text-center text-[13px] font-bold text-white hover:bg-primary-active transition-colors">
              Tạo tài khoản
            </Link>
            <Link href="/login" className="rounded-lg border border-white/20 px-md py-sm text-center text-[13px] font-bold text-white/85 hover:bg-white/10 transition-colors">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar — hotline left, copyright right (đảo ngược so với bố cục cũ) */}
      <div className="border-t border-white/10 px-lg py-md">
        <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-sm text-[13px]">
          <a href="tel:0965965439" className="flex items-center gap-xs font-bold text-white/70 hover:text-primary transition-colors">
            <Phone size={13} strokeWidth={2.5} />
            Hotline: 0898204657
          </a>
          <p className="text-white/50">© {new Date().getFullYear()} Nhím. Đã đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  );
}
