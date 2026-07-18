import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";
import { DeleteAllOrdersButton } from "@/components/admin/DeleteAllOrdersButton";
import { Upload, Package, Wallet, Clock, TriangleAlert } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";

export default async function AdminOrdersPage({ searchParams }: { searchParams: { q?: string; page?: string; tab?: string; sort?: string; order?: string } }) {
  const page = Number(searchParams.page) || 1;
  const limit = 50;
  const skip = (page - 1) * limit;
  const q = searchParams.q || "";
  const tab = searchParams.tab || "all";

  const where: any = {};
  if (q) {
    where.OR = [
      { orderExternalId: { contains: q } },
      { trackingCode: { contains: q } },
      { customer: { fullName: { contains: q } } },
    ];
  }

  if (tab === "unassigned") where.customerId = null;
  if (tab === "money_in") where.orderStatus = "approved";
  if (tab === "unpaid") { where.orderStatus = "approved"; where.payoutStatus = { not: "paid" }; }
  if (tab === "paid") where.payoutStatus = "paid";
  if (tab === "completed") where.orderStatus = "completed";
  if (tab === "clawback") where.orderStatus = "clawback";

  const orderByField = searchParams.sort || "createdAt";
  const orderByDir = searchParams.order || "desc";
  const orderBy = { [orderByField]: orderByDir };

  const [
    allCount, unassignedCount, moneyInCount, unpaidCount, paidCount, completedCount, clawbackCount,
    orders, customers, filteredCount, sumsAgg, moneyInSumAgg,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { customerId: null } }),
    prisma.order.count({ where: { orderStatus: "approved" } }),
    prisma.order.count({ where: { orderStatus: "approved", payoutStatus: { not: "paid" } } }),
    prisma.order.count({ where: { payoutStatus: "paid" } }),
    prisma.order.count({ where: { orderStatus: "completed" } }),
    prisma.order.count({ where: { orderStatus: "clawback" } }),
    prisma.order.findMany({ where, orderBy, skip, take: limit, include: { platform: true, customer: true } }),
    prisma.customer.findMany({ orderBy: { fullName: "asc" } }),
    prisma.order.count({ where }),
    prisma.order.aggregate({ where, _sum: { orderAmount: true, customerRewardAmount: true, systemProfitAmount: true } }),
    prisma.order.aggregate({ where: { orderStatus: "approved" }, _sum: { customerRewardAmount: true } }),
  ]);

  const customerOptions = customers.map((c) => ({ id: c.id, label: `${c.fullName} (${c.customerCode})` }));

  const mappedOrders = orders.map((o) => ({
    id: o.id,
    orderExternalId: o.orderExternalId,
    platformName: o.platform.name,
    customerName: o.customer?.fullName ?? null,
    customerId: o.customerId,
    trackingCode: o.trackingCode,
    orderAmount: Number(o.orderAmount ?? 0),
    customerRewardAmount: Number(o.customerRewardAmount),
    systemProfitAmount: Number(o.systemProfitAmount),
    orderStatus: o.orderStatus,
    payoutStatus: o.payoutStatus,
    orderedAt: o.orderedAt?.toISOString() ?? null,
    completedAt: o.completedAt?.toISOString() ?? null,
    clawbackWarning: o.orderStatus === "completed" && o.completedAt
      ? (new Date().getTime() - new Date(o.completedAt).getTime()) > 15 * 24 * 60 * 60 * 1000
      : false,
  }));

  const totalPages = Math.ceil(filteredCount / limit);
  const counts = { all: allCount, unassigned: unassignedCount, moneyIn: moneyInCount, unpaid: unpaidCount, paid: paidCount, completed: completedCount, clawback: clawbackCount };
  const sums = {
    orderAmount: Number(sumsAgg._sum.orderAmount ?? 0),
    customerRewardAmount: Number(sumsAgg._sum.customerRewardAmount ?? 0),
    systemProfitAmount: Number(sumsAgg._sum.systemProfitAmount ?? 0),
    moneyInTotal: Number(moneyInSumAgg._sum.customerRewardAmount ?? 0),
  };

  return (
    <div className="flex flex-col gap-lg fade-in">

      <PageHeader
        icon="/nhimbaomat.png"
        title="Đơn hàng"
        subtitle="Quản lý đối soát"
        stats={[
          { label: "Đơn:", value: allCount.toLocaleString() },
          { label: "Công nợ:", value: formatCurrency(sums.moneyInTotal) },
        ]}
        action={
          <>
            <DeleteAllOrdersButton />
            <Link href="/admin/orders/import">
              <Button variant="primary" size="md">
                <Upload size={16} strokeWidth={2} />
                Import đối soát
              </Button>
            </Link>
          </>
        }
      />

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <StatCard icon={Package} label="Tổng đơn" value={allCount.toLocaleString()} />
        <StatCard icon={Wallet} label="Tiền đã về" value={formatCurrency(sums.moneyInTotal)} tone="positive" />
        <StatCard icon={Clock} label="Chưa trả" value={String(unpaidCount)} tone="warning" />
        <StatCard icon={TriangleAlert} label="Chưa map" value={String(unassignedCount)} tone="negative" />
      </div>

      <AdminOrdersClient
        orders={mappedOrders}
        customers={customerOptions}
        totalPages={totalPages}
        currentPage={page}
        counts={counts}
        sums={sums}
      />
    </div>
  );
}
