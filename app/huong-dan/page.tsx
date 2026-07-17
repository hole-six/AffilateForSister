import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import {
  ArrowRight,
  Link2,
  ShoppingCart,
  Wallet,
  Send,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hướng Dẫn Sử Dụng — Nhím Hoàn Tiền Shopee",
  description:
    "Cách sử dụng nền tảng hoàn tiền Nhím: 3 bước đơn giản để mua sắm Shopee và nhận hoàn tiền tự động.",
  alternates: { canonical: "/huong-dan" },
  openGraph: {
    title: "Hướng Dẫn Sử Dụng — Nhím Hoàn Tiền Shopee",
    description:
      "Cách sử dụng nền tảng hoàn tiền Nhím: 3 bước đơn giản để mua sắm Shopee và nhận hoàn tiền tự động.",
    type: "website",
    locale: "vi_VN",
    url: "/huong-dan",
    siteName: "Nhím",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://nhimhoahong.site/" },
    { "@type": "ListItem", position: 2, name: "Hướng Dẫn", item: "https://nhimhoahong.site/huong-dan" },
  ],
};

const MAIN_STEPS = [
  {
    step: "01",
    icon: CheckCircle2,
    color: "from-[#fce4ee] to-[#fff0f5]",
    iconColor: "text-primary",
    badge: "bg-primary/10 text-primary",
    image: "/nhimchaomung.png",
    imageAlt: "Nhím chào mừng",
    title: "Tạo tài khoản",
    subtitle: "Miễn phí · Dưới 1 phút",
    description:
      "Điền họ tên, email và mật khẩu là xong. Không cần thẻ ngân hàng, không phí ẩn, không ràng buộc. Ví hoàn tiền của bạn được tạo ngay sau khi đăng ký.",
    tips: ["Đăng ký bằng Google chỉ 1 click", "Xác nhận email để bảo mật tài khoản"],
  },
  {
    step: "02",
    icon: Link2,
    color: "from-[#e3f5ea] to-[#f0faf4]",
    iconColor: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    image: "/nhimgiohang.png",
    imageAlt: "Nhím giỏ hàng",
    title: "Dán link Shopee",
    subtitle: "1 chạm · Tức thì",
    description:
      "Copy link sản phẩm trên Shopee, dán vào ô nhập trên trang chủ. Hệ thống tạo link hoàn tiền riêng cho bạn trong chưa đầy 1 giây — không cần cài thêm gì.",
    tips: ["Hoạt động với mọi sản phẩm Shopee", "Link tạo riêng, bảo mật cá nhân"],
  },
  {
    step: "03",
    icon: ShoppingCart,
    color: "from-[#fef3e2] to-[#fff8f0]",
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
    image: "/nhimmagiamgia.png",
    imageAlt: "Nhím mã giảm giá",
    title: "Mua sắm như bình thường",
    subtitle: "Không thêm bước nào",
    description:
      "Dùng link vừa tạo để vào Shopee rồi thanh toán. Không cần nhập mã, không cần thêm thao tác nào. Mua đúng sản phẩm đó, tiền hoàn tự tính.",
    tips: ["Áp voucher Shopee bình thường được", "Hoàn tiền tính trên giá sau khuyến mãi"],
  },
  {
    step: "04",
    icon: Wallet,
    color: "from-[#f0ecfb] to-[#f8f5ff]",
    iconColor: "text-purple-500",
    badge: "bg-purple-100 text-purple-700",
    image: "/nhimthongbao.png",
    imageAlt: "Nhím thông báo",
    title: "Nhận tiền về ví",
    subtitle: "Rút từ 10.000đ",
    description:
      "Sau khi Shopee xác nhận đơn (thường 7–15 ngày), tiền hoàn tự động cộng vào ví. Rút về ngân hàng bất cứ lúc nào, chuyển khoản trong 24h.",
    tips: ["Theo dõi từng đơn theo thời gian thực", "Nhận thông báo Telegram khi đơn duyệt"],
  },
];

const BONUS_TIPS = [
  {
    icon: Send,
    image: "/nhimtinnhan.png",
    title: "Bot Telegram siêu tiện",
    desc: "Liên kết Telegram một lần trong phần Cá nhân. Sau đó chỉ cần gửi link Shopee vào chat — bot tự trả về link hoàn tiền trong 1 giây và báo ngay khi đơn được duyệt.",
    tag: "Tiết kiệm thời gian",
    tagColor: "bg-sky-100 text-sky-700",
    bg: "bg-gradient-to-br from-sky-50 to-white",
    border: "border-sky-100",
  },
  {
    icon: CheckCircle2,
    image: "/nhimqa.png",
    title: "Giới thiệu bạn bè",
    desc: "Chia sẻ mã mời của bạn. Mỗi khi người bạn mời nhận hoàn tiền, bạn được cộng thêm 5% — mãi mãi, không giới hạn số người.",
    tag: "Kiếm thêm không giới hạn",
    tagColor: "bg-emerald-100 text-emerald-700",
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    border: "border-emerald-100",
  },
  {
    icon: CheckCircle2,
    image: "/nhimbaomat.png",
    title: "Bảo mật tài khoản",
    desc: "Thêm số điện thoại và liên kết Google để bảo vệ tài khoản. Lịch sử đơn hàng và ví của bạn luôn được mã hoá an toàn.",
    tag: "Luôn được bảo vệ",
    tagColor: "bg-rose-100 text-rose-700",
    bg: "bg-gradient-to-br from-rose-50 to-white",
    border: "border-rose-100",
  },
];

export default function HuongDanPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MarketingHeader activePath="/huong-dan" />

      <main className="pt-16 md:pt-[68px]">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fdebf2] via-[#fef5f8] to-white py-[60px] md:py-[80px]">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#f48fb1]/10 blur-[80px]" />

          <div className="relative z-10 max-w-[900px] mx-auto px-lg text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-xs text-[12px] text-mute/60 font-semibold mb-lg">
              <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
              <ChevronRight size={13} className="opacity-40" />
              <span className="text-primary">Hướng dẫn</span>
            </div>

            <div className="relative inline-block mb-lg">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-125" />
              <img
                src="/nhimchaomung.png"
                alt="Nhím"
                className="relative h-20 w-20 rounded-full object-cover shadow-xl ring-4 ring-white mx-auto"
              />
            </div>

            <h1 className="text-[38px] md:text-[54px] font-black text-ink tracking-tight leading-tight mb-md">
              Nhận hoàn tiền{" "}
              <span className="text-primary">siêu dễ</span>
            </h1>
            <p className="text-[17px] text-mute max-w-xl mx-auto leading-relaxed mb-2xl">
              4 bước rõ ràng — không phức tạp, không mất thêm thời gian, tiền về ví tự động.
            </p>

            {/* Quick stat pills */}
            <div className="flex flex-wrap justify-center gap-sm">
              {[
                "✅ Miễn phí hoàn toàn",
                "⚡ Lấy link chưa đầy 1 giây",
                "💸 Rút từ 10.000đ",
                "🔔 Thông báo Telegram",
              ].map((t) => (
                <span
                  key={t}
                  className="bg-white border border-primary/15 text-ink/70 text-[13px] font-semibold px-md py-xs rounded-full shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main steps — alternating layout ── */}
        <section className="py-3xl max-w-[1000px] mx-auto px-lg">
          <div className="flex flex-col gap-3xl">
            {MAIN_STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`flex flex-col md:flex-row items-center gap-2xl ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual card */}
                <div
                  className={`relative flex-shrink-0 w-full md:w-[320px] h-[220px] rounded-[32px] bg-gradient-to-br ${s.color} flex items-center justify-center overflow-hidden border border-white shadow-md`}
                >
                  {/* Big step number watermark */}
                  <span className="absolute -bottom-4 -right-2 font-black text-[120px] leading-none text-black/[0.04] select-none">
                    {s.step}
                  </span>
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="relative z-10 h-36 w-36 object-contain drop-shadow-lg"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-md">
                    <span className="font-black text-[13px] text-primary/40 tracking-widest">
                      BƯỚC {s.step}
                    </span>
                    <span className={`text-[11px] font-bold px-sm py-[2px] rounded-full ${s.badge}`}>
                      {s.subtitle}
                    </span>
                  </div>
                  <h2 className="font-black text-[28px] md:text-[34px] text-ink tracking-tight leading-tight mb-md">
                    {s.title}
                  </h2>
                  <p className="text-[15px] text-mute leading-relaxed mb-lg">{s.description}</p>
                  <ul className="flex flex-col gap-sm">
                    {s.tips.map((tip) => (
                      <li key={tip} className="flex items-center gap-sm text-[14px] text-ink/70 font-semibold">
                        <CheckCircle2 size={15} className={s.iconColor} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-[800px] mx-auto px-lg">
          <div className="flex items-center gap-md">
            <div className="h-px flex-1 bg-primary/10" />
            <span className="text-[12px] font-bold text-primary/40 uppercase tracking-widest">Mẹo nâng cao</span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>
        </div>

        {/* ── Bonus tips ── */}
        <section className="py-3xl max-w-[1000px] mx-auto px-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {BONUS_TIPS.map((tip) => (
              <div
                key={tip.title}
                className={`rounded-[28px] ${tip.bg} border ${tip.border} p-xl flex flex-col gap-lg hover:-translate-y-1 transition-transform`}
              >
                <div className="flex items-start justify-between">
                  <img src={tip.image} alt={tip.title} className="h-16 w-16 object-contain" />
                  <span className={`text-[11px] font-bold px-sm py-[3px] rounded-full ${tip.tagColor}`}>
                    {tip.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-[18px] text-ink mb-xs">{tip.title}</h3>
                  <p className="text-[13px] text-mute leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="py-3xl bg-[#fdf4f8]">
          <div className="max-w-[860px] mx-auto px-lg">
            <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary via-[#e91e8c] to-primary-active p-[48px] md:p-[60px] text-center shadow-2xl shadow-primary/20">
              {/* Blobs */}
              <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-[60px]" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-[60px]" />

              <div className="relative z-10">
                <img
                  src="/nhimchaomung.png"
                  alt="Nhím"
                  className="h-16 w-16 rounded-full object-cover mx-auto mb-lg ring-4 ring-white/40 shadow-lg"
                />
                <h2 className="text-[32px] md:text-[40px] font-black text-white leading-tight tracking-tight mb-md">
                  Sẵn sàng nhận hoàn tiền?
                </h2>
                <p className="text-white/80 text-[16px] mb-2xl max-w-md mx-auto leading-relaxed">
                  Tạo tài khoản miễn phí — lấy link đầu tiên ngay hôm nay.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
                  <Link
                    href="/register"
                    className="group flex items-center gap-sm bg-white text-primary font-black text-[16px] px-2xl py-md rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all"
                  >
                    Tạo tài khoản miễn phí
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-sm bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold text-[15px] px-xl py-md rounded-2xl hover:bg-white/25 transition-all"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
