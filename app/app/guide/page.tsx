import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronRight, ArrowRight, BookOpen, MessageCircle } from "lucide-react";

const STEPS = [
  {
    image: "/nhimmagiamgia.png",
    color: "from-[#fce4ee] to-[#fff0f5]",
    badge: "bg-primary/10 text-primary",
    title: "Dán link sản phẩm",
    body: "Vào mục Hoàn tiền, dán link Shopee bạn muốn mua, chọn nền tảng và bấm Tạo link.",
  },
  {
    image: "/nhimgiohang.png",
    color: "from-[#e3f5ea] to-[#f0faf4]",
    badge: "bg-emerald-100 text-emerald-700",
    title: "Bấm vào link vừa tạo",
    body: "Luôn bấm vào link hoàn tiền hệ thống trả về trước khi mua hàng để đơn được ghi nhận đúng.",
  },
  {
    image: "/nhimchaomung.png",
    color: "from-[#fef3e2] to-[#fff8f0]",
    badge: "bg-amber-100 text-amber-700",
    title: "Hoàn tất mua hàng",
    body: "Thanh toán bình thường trên Shopee như mọi khi — không cần thêm thao tác nào.",
  },
  {
    image: "/nhimchodoi.png",
    color: "from-[#eef2ff] to-[#f5f8ff]",
    badge: "bg-blue-100 text-blue-700",
    title: "Chờ đối soát",
    body: "Định kỳ hệ thống đối soát đơn hàng từ sàn — đơn chỉ được xác nhận khi Shopee đánh dấu trạng thái sản phẩm là \"Hoàn thành\".",
  },
  {
    image: "/nhimthongbao.png",
    color: "from-[#f0ecfb] to-[#f8f5ff]",
    badge: "bg-violet-100 text-violet-700",
    title: "Nhận hoàn tiền",
    body: "Khi đơn được duyệt, số tiền hoàn sẽ hiện trong Ví tiền và được thanh toán theo kỳ.",
  },
];

const NOTES = [
  { title: "Luôn bấm lại link mỗi lần mua", body: "Mỗi lượt mua hàng cần bấm lại link hoàn tiền ngay trước khi vào Shopee. Nếu đã tắt trình duyệt hoặc mở lại app sau đó, link theo dõi có thể hết hiệu lực." },
  { title: "Không dùng thêm app hoàn tiền khác", body: "Shopee chỉ tính hoa hồng cho lượt click gần nhất. Nếu bấm thêm link từ ứng dụng khác sau khi đã bấm link Nhím, đơn sẽ bị tính cho nguồn khác." },
  { title: "Hoàn tất đơn trong phiên, không thoát", body: "Sau khi bấm link, hoàn tất đặt hàng trong cùng phiên truy cập. Thoát ứng dụng giữa chừng có thể khiến Shopee không ghi nhận được nguồn click." },
  { title: "Một số ngành hàng không tính hoa hồng", body: "Shopee loại trừ hoa hồng với: nạp thẻ điện thoại, Shopee Xu/Ví, vé máy bay và một số sản phẩm Mall đặc biệt." },
  { title: "Đơn có thể bị huỷ hoa hồng sau khi duyệt", body: "Nếu bạn đổi trả hàng, huỷ đơn, hoặc Shopee phát hiện gian lận, hoa hồng đã ghi nhận có thể bị thu hồi." },
  { title: "Thời gian đối soát thường 7–20 ngày", body: "Shopee xác nhận hoa hồng sau khi hết thời hạn đổi trả. Đơn ở trạng thái \"Chờ xác nhận\" là bình thường, không phải lỗi hệ thống." },
];

export default function CustomerGuidePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-xl pb-2xl fade-in">

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 px-xl py-2xl shadow-xl shadow-violet-500/20">
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-6 left-1/4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <img src="/nhimqa.png" alt="" aria-hidden="true" className="absolute right-4 bottom-0 h-28 w-28 object-contain opacity-20 pointer-events-none select-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-xs text-white/50 text-[11px] font-bold uppercase tracking-widest mb-xs">
            <BookOpen size={11} />
            Hướng dẫn
          </div>
          <h1 className="font-black text-[28px] md:text-[34px] text-white leading-tight tracking-tight mb-sm">
            5 bước nhận hoàn tiền
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-lg">
            Đọc kỹ một lần để không bỏ sót đơn nào — từ lúc tạo link đến khi tiền về ví.
          </p>
        </div>
      </div>

      {/* ══ STEPS ══ */}
      <div className="flex flex-col gap-md">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex gap-md items-stretch">
            {/* Timeline */}
            <div className="flex flex-col items-center shrink-0 w-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-primary/15 text-[13px] font-black text-primary z-10">
                {i + 1}
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 w-px bg-primary/10 mt-1" />}
            </div>

            {/* Card */}
            <div className={`flex-1 mb-md flex items-center gap-lg rounded-2xl bg-gradient-to-br ${s.color} border border-white p-lg shadow-sm hover:-translate-y-0.5 transition-transform`}>
              <img src={s.image} alt="" className="h-14 w-14 object-contain shrink-0 drop-shadow-md" />
              <div>
                <div className={`inline-block text-[10px] font-bold px-sm py-[2px] rounded-full ${s.badge} mb-xs`}>
                  Bước {i + 1}
                </div>
                <h3 className="font-black text-[16px] text-ink leading-tight mb-xs">{s.title}</h3>
                <p className="text-[13px] text-mute leading-relaxed">{s.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ══ NOTES HEADER ══ */}
      <div className="flex items-center gap-md">
        <img src="/nhimthongbao.png" alt="" className="h-10 w-10 object-contain" />
        <div>
          <h2 className="font-black text-[18px] text-ink">Lưu ý quan trọng</h2>
          <p className="text-[12px] text-mute">Đọc kỹ trước khi mua — tránh mất tiền hoàn vì những lỗi rất dễ gặp</p>
        </div>
      </div>

      {/* ══ NOTES GRID ══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        {NOTES.map((n) => (
          <div key={n.title} className="flex items-start gap-md rounded-2xl bg-amber-50 border border-amber-100 p-lg hover:-translate-y-0.5 transition-transform">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle size={15} strokeWidth={2} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-[13px] font-black text-amber-900 mb-xs">{n.title}</h3>
              <p className="text-[12px] text-amber-700 leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ CHECKLIST ══ */}
      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.05] p-xl">
        <div className="flex items-center gap-sm mb-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm">
            <CheckCircle2 size={16} strokeWidth={2} className="text-white" />
          </div>
          <h3 className="font-black text-[15px] text-ink">Checklist trước khi mua</h3>
        </div>
        <div className="flex flex-col gap-sm">
          {[
            "Đã tạo link hoàn tiền từ hệ thống Nhím",
            "Đã bấm vào link hoàn tiền để vào Shopee",
            "Chưa bấm link nào khác sau khi vào Shopee",
            "Hoàn tất thanh toán trong cùng một phiên trình duyệt",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-sm rounded-xl bg-gray-50 border border-gray-100 px-md py-sm">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary/20" />
              </div>
              <p className="text-[13px] font-medium text-ink/70">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CTA ══ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-lg rounded-3xl bg-gradient-to-br from-[#fdeef4] to-[#fdebf2] border border-primary/10 p-xl shadow-sm">
        <img src="/nhimqa.png" alt="" className="h-14 w-14 object-contain shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-black text-[16px] text-ink">Vẫn còn thắc mắc?</div>
          <div className="text-[13px] text-mute mt-xs">Liên hệ hỗ trợ hoặc xem thông báo từ hệ thống.</div>
        </div>
        <Link
          href="/app/notifications"
          className="group shrink-0 flex items-center gap-sm rounded-2xl bg-primary px-lg py-md text-[13px] font-black text-white shadow-md shadow-primary/25 hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          Xem thông báo
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
