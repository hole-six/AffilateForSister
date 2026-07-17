import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sparkles, Tag, TrendingDown } from "lucide-react";
import { DealGrid } from "@/components/customer/DealGrid";
import { ServerSearchInput } from "@/components/ui/ServerSearchInput";

export default async function CustomerDealsPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";

  const where: any = { status: "active" };
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const [totalCount, activeDealsCount, deals] = await Promise.all([
    prisma.dealPost.count({ where }),
    prisma.dealPost.count({ where: { status: "active" } }),
    prisma.dealPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  const formattedDeals = deals.map((d) => ({
    id: d.id,
    title: d.title,
    description: d.description,
    originalPrice: d.originalPrice ? Number(d.originalPrice) : null,
    salePrice: d.salePrice ? Number(d.salePrice) : null,
    discountPercent: d.discountPercent,
    imageUrl: d.uploadedImageUrl || d.shopeeImageUrl || null,
    shortUrl: d.shortUrl,
    clicks: d.clicks,
    createdAt: d.createdAt.toISOString(),
  }));

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex flex-col gap-xl fade-in pb-2xl">
      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#e91e8c] to-primary-active px-xl py-2xl shadow-xl shadow-primary/20">
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <img
          src="/nhimmagiamgia.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-32 w-32 object-contain opacity-20 pointer-events-none select-none"
        />
        <div className="relative z-10">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-xs">Ưu đãi</p>
          <h1 className="font-black text-[28px] md:text-[36px] text-white leading-tight tracking-tight mb-sm">
            Deal Sập Sàn Hôm Nay 🔥
          </h1>
          <p className="text-white/75 text-[14px] max-w-lg leading-relaxed mb-lg">
            Tổng hợp các deal giảm giá hot nhất, cập nhật liên tục mỗi ngày.
          </p>
          <div className="flex flex-wrap gap-sm">
            <div className="flex items-center gap-xs bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-md py-[5px] rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              {activeDealsCount} deals đang có
            </div>
            <div className="flex items-center gap-xs bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-md py-[5px] rounded-full">
              <TrendingDown size={12} strokeWidth={2.5} />
              Giảm sâu đến 80%
            </div>
            <div className="flex items-center gap-xs bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-md py-[5px] rounded-full">
              <Sparkles size={12} strokeWidth={2.5} />
              Kết hợp hoàn tiền
            </div>
          </div>
        </div>
      </div>

      {/* ══ SEARCH ══ */}
      <div className="flex items-center gap-md">
        <div className="flex items-center gap-sm text-[13px] font-bold text-mute/60">
          <Tag size={14} className="text-primary" />
          {totalCount} kết quả
        </div>
        <div className="flex-1">
          <ServerSearchInput placeholder="Tìm kiếm deal giảm giá..." />
        </div>
      </div>

      {/* ══ GRID ══ */}
      {formattedDeals.length === 0 ? (
        <div className="flex flex-col items-center py-3xl text-center">
          <img src="/nhimchodoi.png" alt="" className="h-24 w-24 object-contain mb-lg" />
          <p className="text-[16px] font-bold text-ink">Không tìm thấy deal nào</p>
          <p className="text-[13px] text-mute mt-xs">Thử tìm kiếm với từ khoá khác xem sao!</p>
        </div>
      ) : (
        <DealGrid deals={formattedDeals} totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
}
