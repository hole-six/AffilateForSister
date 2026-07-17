import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { ShopeeIcon } from "@/components/icons/PlatformIcons";
import { ArrowRight, Sparkles, Percent, Clock3, Tags, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Đối Tác — Nhím | Nền Tảng Hỗ Trợ Hoàn Tiền",
  description: "Nhím đồng hành cùng Shopee để mang lại hoàn tiền minh bạch cho mọi đơn hàng của bạn.",
  alternates: { canonical: "/cua-hang" },
  openGraph: {
    title: "Đối Tác — Nhím",
    description: "Nhím đồng hành cùng Shopee để mang lại hoàn tiền minh bạch cho mọi đơn hàng của bạn.",
    type: "website",
    locale: "vi_VN",
    url: "/cua-hang",
    siteName: "Nhím",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://nhimhoahong.site/" },
    { "@type": "ListItem", position: 2, name: "Cửa Hàng", item: "https://nhimhoahong.site/cua-hang" },
  ],
};

export default async function CuaHangPage() {
  const activeRule = await prisma.commissionRule.findFirst({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  const customerRate = Number(activeRule?.customerRate ?? 80);

  return (
    <div className="min-h-screen bg-canvas font-sans overflow-x-hidden text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <MarketingHeader activePath="/cua-hang" />

      <main className="pt-16 md:pt-[100px]">
        {/* Header Hero */}
        <section className="border-b border-primary/10 py-2xl">
          <div className="max-w-[1200px] mx-auto px-lg">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary mb-sm">Đối tác chính thức</p>
            <h1 className="text-[34px] md:text-[46px] font-black text-ink tracking-tight max-w-2xl">
              Một sàn, hoàn tiền hết mình
            </h1>
            <p className="text-[16px] text-mute max-w-xl leading-relaxed mt-sm">
              Nhím tập trung vào Shopee để đối soát chính xác và hoàn tiền nhanh nhất, thay vì dàn trải nhiều sàn.
            </p>
          </div>
        </section>

        {/* Partner spotlight */}
        <section className="py-2xl max-w-[1200px] mx-auto px-lg">
          <div className="rounded-[12px] border border-primary/10 bg-white shadow-sm overflow-hidden md:grid md:grid-cols-[280px_1fr]">
            {/* Left: brand */}
            <div className="flex flex-col items-center justify-center gap-md p-2xl bg-canvas-soft border-b md:border-b-0 md:border-r border-primary/10">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                <ShopeeIcon size={44} />
              </div>
              <h2 className="text-[22px] font-black text-ink">Shopee</h2>
              <p className="text-mute text-[14px] text-center leading-relaxed">
                Sàn TMĐT lớn nhất mà Nhím đối soát trực tiếp.
              </p>
            </div>

            {/* Right: detail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10">
              <div className="bg-white p-xl flex items-start gap-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ee4d2d]/10 text-[#ee4d2d]">
                  <Percent size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-mute uppercase tracking-wide">Hoàn tiền tối đa</div>
                  <div className="text-[22px] font-black text-ink">{customerRate}%</div>
                </div>
              </div>
              <div className="bg-white p-xl flex items-start gap-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-mute uppercase tracking-wide">Thời gian duyệt</div>
                  <div className="text-[22px] font-black text-ink">15-30 ngày</div>
                </div>
              </div>
              <div className="bg-white p-xl flex items-start gap-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Tags size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-mute uppercase tracking-wide">Ngành hàng</div>
                  <div className="text-[15px] font-bold text-ink leading-snug">Thời trang, mỹ phẩm, điện tử &amp; hơn thế</div>
                </div>
              </div>
              <div className="bg-white p-xl flex items-start gap-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <ShieldCheck size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-mute uppercase tracking-wide">Đối soát</div>
                  <div className="text-[15px] font-bold text-ink leading-snug">Minh bạch, tự động theo từng đơn</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-canvas pb-3xl pt-xl max-w-[1200px] mx-auto px-lg">
          <div className="bg-gradient-to-r from-primary to-primary-active rounded-[32px] p-3xl flex flex-col items-center text-center shadow-2xl shadow-primary/20 relative overflow-hidden">
            <Sparkles className="absolute top-10 left-10 text-white/30 w-16 h-16" />
            <Sparkles className="absolute bottom-10 right-10 text-white/30 w-16 h-16" />
            
            <h2 className="text-[32px] font-black text-white mb-md relative z-10">Bạn đã sẵn sàng để tiết kiệm?</h2>
            <p className="text-white/90 text-[16px] mb-xl max-w-xl relative z-10">
              Đăng ký ngay tài khoản để bắt đầu lấy link sản phẩm từ các cửa hàng trên và nhận lại tiền mặt cho mỗi đơn mua hàng thành công.
            </p>
            <Link href="/register" className="bg-white text-primary font-black px-2xl py-lg rounded-2xl flex items-center gap-sm hover:scale-105 hover:shadow-xl transition-all relative z-10">
              Bắt đầu nhận hoàn tiền <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </main>

      <MarketingFooter />
    </div>
  );
}
