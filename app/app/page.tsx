import { redirect } from "next/navigation";
import {
  Clock,
  Wallet,
  Package,
  ArrowUpRight,
  ShoppingBag,
  ChevronRight,
  Star,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Timer,
} from "lucide-react";
import QRCode from "qrcode";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { InviteSection } from "@/components/customer/InviteSection";
import { StatCard } from "@/components/ui/StatCard";
import { isWithdrawEligible, isWithdrawClearing, daysUntilWithdrawEligible } from "@/lib/withdrawEligibility";
import { CompletePhoneModal } from "@/components/customer/CompletePhoneModal";

const PLATFORM_STYLE: Record<string, { color: string }> = {
  SHOPEE: { color: "#ee4d2d" },
  LAZADA: { color: "#0f146d" },
  TIKI:   { color: "#1a73e8" },
};

const STATUS_CONFIG = {
  paid: {
    label: "Đã rút",
    icon: CheckCircle2,
    cls: "bg-emerald-100 text-emerald-700",
  },
  processing: {
    label: "Đang xử lý",
    icon: Timer,
    cls: "bg-blue-100 text-blue-700",
  },
  approved: {
    label: "Sẵn sàng rút",
    icon: Sparkles,
    cls: "bg-violet-100 text-violet-700",
  },
  clearing: {
    label: "Đang đối soát",
    icon: Clock,
    cls: "bg-sky-100 text-sky-700",
  },
  pending: {
    label: "Chờ duyệt",
    icon: Clock,
    cls: "bg-amber-100 text-amber-700",
  },
} as const;

function getStatusKey(order: { orderStatus: string; payoutStatus: string; completedAt: Date | string | null }) {
  if (order.payoutStatus === "paid") return "paid";
  if (order.payoutStatus === "processing") return "processing";
  if (order.orderStatus === "approved") return isWithdrawEligible(order) ? "approved" : "clearing";
  return "pending";
}

export default async function CustomerHomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin" || !session.customerId) redirect("/admin");

  const [customer, activeRule] = await Promise.all([
    prisma.customer.findUnique({
      where: { id: session.customerId },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            trackingLink: { select: { productImage: true, productTitle: true } },
            platform: { select: { code: true, name: true } },
          },
        },
        trackingLinks: { orderBy: { createdAt: "desc" }, take: 3 },
      },
    }),
    prisma.commissionRule.findFirst({ where: { active: true }, orderBy: { createdAt: "desc" } }),
  ]);

  const allOrders = customer?.orders ?? [];
  const totalIncome = allOrders.reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const pendingIncome = allOrders
    .filter((o) => o.orderStatus === "pending" || isWithdrawClearing(o))
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const availableBalance = allOrders
    .filter((o) => isWithdrawEligible(o))
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const paidTotal = allOrders
    .filter((o) => o.payoutStatus === "paid")
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);

  const firstName = (customer?.fullName ?? session.fullName).split(" ").at(-1) ?? "bạn";
  const customerCode = customer?.customerCode ?? "";
  const referralRate = activeRule?.referralRate ? Number(activeRule.referralRate) : 0.05;
  const maxReferralOrders = activeRule?.maxReferralOrders ?? 5;
  const referralValidityMonths = activeRule?.referralValidityMonths ?? 6;

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://nhimhoahong.site"}/register?ref=${customerCode}`;
  let qrDataUrl = "";
  try {
    qrDataUrl = await QRCode.toDataURL(inviteUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#2d1f14", light: "#ffffff" },
    });
  } catch (_) {}

  return (
    <div className="flex flex-col gap-xl fade-in">
      {customer && !customer.phone && <CompletePhoneModal />}

      {/* ══ HERO BANNER ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#e91e8c] to-primary-active px-xl py-2xl shadow-xl shadow-primary/20 min-h-[160px]">
        {/* Background image */}
        <img
          src="/nhimchaomung.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 bottom-0 h-32 w-32 object-contain opacity-20 pointer-events-none select-none"
        />
        {/* Blobs */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg">
          <div>
            <p className="text-white/60 text-[12px] font-semibold uppercase tracking-wider mb-xs">
              Trang chủ
            </p>
            <h1 className="text-white font-black text-[26px] md:text-[30px] tracking-tight leading-tight">
              Xin chào, {firstName}! 👋
            </h1>
            <p className="text-white/75 text-[14px] mt-xs leading-snug">
              {allOrders.length === 0
                ? "Chưa có đơn nào — hãy tạo link đầu tiên!"
                : `${allOrders.length} đơn đã ghi nhận — tiếp tục kiếm tiền nhé!`}
            </p>
          </div>
          <a
            href="/app/refunds"
            className="group inline-flex items-center gap-sm self-start sm:self-auto bg-white text-primary font-black text-[14px] px-lg py-md rounded-2xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all whitespace-nowrap"
          >
            <Sparkles size={16} />
            Lấy link hoàn tiền
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ══ 4 STAT CARDS ══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <StatCard icon={Clock}    label="Chờ duyệt"    value={formatCurrency(pendingIncome)}    tag="Đang xử lý" tone="warning" />
        <StatCard icon={Wallet}   label="Sẵn sàng rút" value={formatCurrency(availableBalance)} tag="Rút được"   tone="positive" />
        <StatCard icon={Package}  label="Đã rút"        value={formatCurrency(paidTotal)}        tag="Đã nhận"   tone="default" />
        <StatCard icon={Star}     label="Tổng tích luỹ" value={formatCurrency(totalIncome)}      tag="Tổng cộng" />
      </div>

      {/* ══ BOTTOM PANELS ══ */}
      <div className="grid grid-cols-1 gap-xl xl:grid-cols-[2fr_1fr]">

        {/* Lịch sử đơn */}
        <div className="rounded-3xl bg-white p-xl shadow-sm ring-1 ring-black/[0.05] overflow-hidden">
          <div className="mb-lg flex items-center justify-between">
            <h2 className="flex items-center gap-sm text-[16px] font-black text-ink">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-400 shadow-sm">
                <ShoppingBag size={15} strokeWidth={2} className="text-white" />
              </div>
              Lịch sử đơn hàng
            </h2>
            <a
              href="/app/orders"
              className="group flex items-center gap-xs text-[12px] font-bold text-primary hover:text-primary-active transition-colors"
            >
              Xem tất cả
              <ChevronRight size={13} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {allOrders.length === 0 ? (
            <div className="flex flex-col items-center py-2xl text-center">
              <img src="/nhimchodoi.png" alt="" className="mb-lg h-24 w-24 object-contain" />
              <div className="text-[15px] font-bold text-ink">Chưa có đơn hàng nào</div>
              <div className="mt-xs text-[13px] text-mute">Tạo link hoàn tiền đầu tiên để bắt đầu!</div>
              <a
                href="/app/refunds"
                className="mt-lg inline-flex items-center gap-xs bg-primary text-white font-bold text-[13px] px-lg py-sm rounded-2xl shadow-md shadow-primary/25 hover:-translate-y-0.5 transition-all"
              >
                <ArrowUpRight size={14} />
                Tạo link ngay
              </a>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-gray-50">
              {allOrders.map((order) => {
                const platformCode = order.platform?.code?.toUpperCase() ?? "";
                const platformColor = PLATFORM_STYLE[platformCode]?.color ?? "#EC407A";
                const productImage = order.trackingLink?.productImage ?? null;
                const productTitle =
                  order.trackingLink?.productTitle ??
                  order.itemName ??
                  `Đơn hàng ${order.orderExternalId}`;
                const statusKey = getStatusKey(order);
                const statusCfg = STATUS_CONFIG[statusKey];
                const StatusIcon = statusCfg.icon;

                return (
                  <li
                    key={order.id}
                    className="flex items-center gap-md py-md px-xs hover:bg-primary/[0.02] rounded-2xl transition-colors"
                  >
                    <ProductThumb image={productImage} color={platformColor} platform={platformCode} />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">{productTitle}</p>
                      <div className="flex items-center gap-xs mt-0.5">
                        <span className="text-[10px] font-bold uppercase" style={{ color: platformColor }}>
                          {order.platform?.name ?? platformCode}
                        </span>
                        <span className="text-ink/15">·</span>
                        <span className="text-[11px] text-mute">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[13px] font-black text-emerald-600 whitespace-nowrap">
                        +{formatCurrency(order.customerRewardAmount)}
                      </span>
                      <span className={`inline-flex items-center gap-[3px] text-[10px] font-bold px-xs py-[2px] rounded-full whitespace-nowrap ${statusCfg.cls}`}>
                        <StatusIcon size={9} strokeWidth={2.5} />
                        {statusKey === "clearing" && daysUntilWithdrawEligible(order)
                          ? `${statusCfg.label} · còn ${daysUntilWithdrawEligible(order)}d`
                          : statusCfg.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {allOrders.length > 0 && (
            <div className="mt-lg pt-md border-t border-gray-50 flex items-center justify-between text-[12px] text-mute">
              <div className="flex items-center gap-xs">
                <TrendingUp size={13} className="text-primary" />
                <span className="font-medium">Tổng: <span className="font-bold text-ink">{formatCurrency(totalIncome)}</span></span>
              </div>
              <a href="/app/orders" className="font-bold text-primary hover:underline">
                Xem tất cả →
              </a>
            </div>
          )}
        </div>

        {/* Panel phải */}
        <div className="flex flex-col gap-lg">
          <InviteSection
            customerCode={customerCode}
            qrDataUrl={qrDataUrl}
            referralRate={referralRate}
            maxReferralOrders={maxReferralOrders}
            referralValidityMonths={referralValidityMonths}
          />
        </div>
      </div>
    </div>
  );
}

function ProductThumb({ image, color, platform }: { image: string | null; color: string; platform: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        className="h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-black/[0.06] shadow-sm"
      />
    );
  }
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm"
      style={{ backgroundColor: `${color}18`, color }}
    >
      <ShoppingBag size={17} strokeWidth={1.75} />
    </div>
  );
}
