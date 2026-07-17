import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { CustomerLinkForm } from "@/components/customer/CustomerLinkForm";
import { RefundHistoryClient } from "@/components/customer/RefundHistoryClient";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  MousePointerClick,
  XCircle,
  Layers,
} from "lucide-react";

export default async function CustomerRefundsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const session = await getSession();
  if (!session?.customerId) redirect("/admin");

  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";

  const where: any = { customerId: session.customerId };
  if (q) where.shortCode = { contains: q };

  const [platforms, links, totalCount] = await Promise.all([
    prisma.platform.findMany({ where: { status: "active" }, orderBy: { name: "asc" } }),
    prisma.trackingLink.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { platform: true },
      skip,
      take: limit,
    }),
    prisma.trackingLink.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  const formattedLinks = links.map((l) => ({
    id: l.id,
    createdAt: formatDate(l.createdAt),
    shortCode: l.shortCode || "",
    shortUrl: l.shortUrl,
    productTitle: l.productTitle,
    productImage: l.productImage,
    platform: { code: l.platform.code, name: l.platform.name },
  }));

  const NOTES = [
    {
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-50",
      text: (
        <>
          <strong className="text-ink">Xoá sản phẩm</strong> tương tự đã có trong giỏ hàng trước khi bấm link.
        </>
      ),
    },
    {
      icon: MousePointerClick,
      color: "text-amber-500",
      bg: "bg-amber-50",
      text: "Không bấm link khác (live, quảng cáo) trong khi đang mua hàng.",
    },
    {
      icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-50",
      text: (
        <>
          Hoàn tất mua hàng trong{" "}
          <strong className="text-primary">cùng một phiên trình duyệt</strong>.
        </>
      ),
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      text: "Nên nhận đơn trống mới xác nhận để tránh mất tiền hoàn.",
    },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-xl fade-in pb-2xl">

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#e91e8c] to-primary-active px-xl py-2xl shadow-xl shadow-primary/20">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-6 left-1/2 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        {/* mascot */}
        <img
          src="/nhimmagiamgia.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-28 w-28 object-contain opacity-25 pointer-events-none select-none"
        />
        <div className="relative z-10">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-xs">Hoàn tiền</p>
          <h1 className="text-white font-black text-[28px] md:text-[34px] tracking-tight leading-tight mb-sm">
            Tạo link hoàn tiền
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-lg">
            Dán link sản phẩm Shopee vào đây, lấy link hoàn tiền riêng chỉ trong vài giây.
          </p>
          <div className="flex flex-wrap gap-sm mt-lg">
            {[
              { icon: Zap, label: "Tức thì" },
              { icon: ShieldCheck, label: "Bảo mật" },
              { icon: Sparkles, label: "Miễn phí" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-xs bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-md py-[5px] rounded-full"
              >
                <Icon size={12} strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ NOTES ══ */}
      <div className="rounded-3xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05]">
        <div className="flex items-center gap-sm mb-lg">
          <img src="/nhimqa.png" alt="" className="h-10 w-10 object-contain" />
          <div>
            <h3 className="font-black text-[15px] text-ink">Lưu ý khi mua sắm</h3>
            <p className="text-[12px] text-mute">Làm đúng để không mất tiền hoàn</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {NOTES.map((note, i) => {
            const Icon = note.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-md rounded-2xl bg-gray-50/60 border border-gray-100 p-md"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${note.bg}`}>
                  <Icon size={15} strokeWidth={2} className={note.color} />
                </div>
                <p className="text-[13px] text-mute/80 leading-relaxed font-medium">{note.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ FORM ══ */}
      <div className="rounded-3xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05]">
        <div className="flex items-center gap-sm mb-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-400 shadow-sm">
            <Sparkles size={16} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <h2 className="font-black text-[15px] text-ink">Tạo link mới</h2>
            <p className="text-[12px] text-mute">Paste link Shopee và nhận link hoàn tiền</p>
          </div>
        </div>
        <CustomerLinkForm
          platforms={platforms.map((p) => ({ id: p.id, code: p.code, label: p.name }))}
        />
      </div>

      {/* ══ HISTORY ══ */}
      <RefundHistoryClient
        links={formattedLinks}
        totalPages={totalPages}
        currentPage={page}
        totalCount={totalCount}
      />
    </div>
  );
}
