import Link from "next/link";
import {
  ArrowRight,
  Link2,
  ClipboardList,
  Wallet,
  Send,
  TicketPercent,
  ShieldCheck,
  Sparkles,
  PiggyBank,
  Gift,
} from "lucide-react";
import { ShopeeIcon } from "@/components/icons/PlatformIcons";
import { Reveal } from "@/components/marketing/Reveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PublicFloatingSupport } from "@/components/marketing/PublicFloatingSupport";

const HIGHLIGHTS = [
  {
    image: "/nhimchaomung.png",
    title: "Lấy link chỉ 1 chạm",
    description: "Dán link Shopee vào ô nhập, hệ thống trả về link hoàn tiền ngay lập tức.",
    bg: "bg-[#fce4ee]",
  },
  {
    image: "/nhimqa.png",
    title: "Đơn hàng minh bạch",
    description: "Trạng thái từng đơn cập nhật real-time, không phải đoán mò khi nào tiền về.",
    bg: "bg-[#e3f5ea]",
  },
  {
    image: "/nhimmagiamgia.png",
    title: "Rút từ 10.000đ",
    description: "Ngưỡng rút thấp, chuyển khoản nhanh, không giữ tiền lâu trong ví.",
    bg: "bg-[#fce4ee]",
  },
  {
    image: "/nhimmagiamgia.png",
    title: "Giới thiệu bạn bè",
    description: "Chia sẻ mã mời, nhận thêm 5% trên mỗi khoản hoàn tiền của người bạn mời.",
    bg: "bg-[#f0ecfb]",
  },
];

const FEATURES = [
  {
    icon: Link2,
    title: "Tạo link hoàn tiền tức thì",
    description: "Dán link sản phẩm Shopee — hệ thống tự sinh link riêng cho bạn ngay lập tức.",
  },
  {
    icon: ClipboardList,
    title: "Theo dõi đơn hàng minh bạch",
    description: "Mọi đơn hàng được ghi nhận rõ ràng: chờ xác nhận, đã duyệt, số tiền hoàn từng đơn.",
  },
  {
    icon: Wallet,
    title: "Rút tiền từ 10.000đ",
    description: "Đủ ngưỡng tối thiểu là rút được ngay về ngân hàng, không phí ẩn.",
  },
  {
    icon: Send,
    title: "Bot Telegram tự động",
    description: "Gửi link thẳng vào Telegram, bot tự đổi link và báo khi đơn được duyệt — không cần mở web.",
  },
  {
    icon: TicketPercent,
    title: "Kho voucher độc quyền",
    description: "Cập nhật voucher, mã giảm giá Shopee để tối ưu thêm phần tiết kiệm mỗi đơn.",
  },
  {
    icon: ShieldCheck,
    title: "Đối soát minh bạch",
    description: "Dữ liệu đối soát hoa hồng từ sàn được nhập và tính toán rõ ràng, không mập mờ.",
  },
];

const STEPS = [
  {
    title: "Tạo tài khoản",
    description: "Đăng ký miễn phí trong chưa đầy 1 phút, không cần thẻ thanh toán.",
  },
  {
    title: "Dán link Shopee",
    description: "Copy link sản phẩm bạn muốn mua, dán vào hệ thống để lấy link hoàn tiền riêng.",
  },
  {
    title: "Mua sắm như bình thường",
    description: "Bấm vào link vừa tạo rồi thanh toán — không thêm bước nào khác.",
  },
  {
    title: "Nhận tiền về ví",
    description: "Sau khi Shopee xác nhận đơn, tiền hoàn tự động cộng vào ví, rút bất cứ lúc nào.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Hệ thống hoạt động như thế nào?",
    answer:
      "Khi bạn mua hàng qua link hoàn tiền của hệ thống, sàn thương mại điện tử sẽ trả một khoản hoa hồng affiliate. Chúng tôi chia lại phần lớn khoản này cho bạn dưới dạng tiền hoàn vào ví.",
  },
  {
    question: "Rút tiền tối thiểu bao nhiêu?",
    answer:
      "Mức rút tối thiểu là 10.000đ. Bạn có thể nhận về tài khoản ngân hàng sau khi đơn hàng được duyệt.",
  },
  {
    question: "Có mất phí sử dụng không?",
    answer: "Hoàn toàn miễn phí — không thu phí đăng ký, tạo link hay rút tiền.",
  },
  {
    question: "Hệ thống hỗ trợ sàn nào?",
    answer: "Hiện tại hệ thống tập trung đối soát Shopee để đảm bảo hoàn tiền chính xác và nhanh nhất.",
  },
  {
    question: "Tôi có thể dùng Telegram thay vì vào web không?",
    answer:
      "Có. Liên kết tài khoản Telegram trong mục Cá nhân, sau đó gửi link sản phẩm thẳng vào bot — bot tự đổi link và báo khi đơn được duyệt.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas font-sans overflow-x-hidden text-ink">
      <MarketingHeader activePath="/" />

      <main className="pt-16 md:pt-[100px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#fdebf2] min-h-[420px] md:min-h-[520px]">
          {/* Background image — full cover */}
          <div className="absolute inset-0">
            <img
              src="/backgroundangky.png"
              alt=""
              className="h-full w-full object-cover object-center"
              aria-hidden="true"
            />
            {/* left fade so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdebf2] via-[#fdebf2]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-lg md:px-3xl py-3xl md:py-[100px]">
            <div className="max-w-xl space-y-lg fade-in">
              <div className="inline-flex items-center gap-sm bg-gradient-to-r from-primary to-[#f48fb1] text-white px-lg py-sm rounded-full shadow-md shadow-primary/30">
                <Gift size={16} strokeWidth={2} />
                <span className="text-[13px] font-bold">Cashback cho mọi đơn Shopee</span>
              </div>

              <h1 className="text-[38px] md:text-[54px] font-black leading-tight text-ink tracking-tight">
                Biến mọi link Shopee
                <br />
                thành tiền hoàn{" "}
                <img
                  src="/nhimchaomung.png"
                  alt="Nhím"
                  className="inline-block h-[0.9em] w-[0.9em] object-cover rounded-full align-middle"
                />
              </h1>

              <p className="text-[18px] text-mute max-w-lg leading-relaxed">
                Dán link một lần. Cashback tự động về ví Nhím.
              </p>

              {/* Shopee badge — redesigned */}
              <div className="inline-flex items-center gap-sm w-fit rounded-2xl border border-[#ee4d2d]/20 bg-white/80 backdrop-blur-sm px-md py-sm shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ee4d2d]">
                  <ShopeeIcon size={16} className="brightness-0 invert" />
                </div>
                <span className="text-[13px] font-bold text-ink">Đối tác chính thức của Shopee</span>
              </div>

              <div className="pt-sm">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-pale transition-all shadow-sm"
                >
                  Đăng nhập
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Mobile-only banner */}
            <div className="mt-2xl rounded-[24px] overflow-hidden shadow-lg md:hidden">
              <img src="/landingpage.png" alt="Nhím hoàn tiền cùng điện thoại mua sắm" className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>



        {/* How It Works — vertical timeline */}
        <section id="how-it-works" className="py-3xl bg-canvas relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-pale/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div className="max-w-[760px] mx-auto px-lg">
            <div className="text-center mb-3xl">
              <div className="inline-flex items-center justify-center mb-sm">
                <Sparkles className="text-primary mr-2" size={24} />
                <h2 className="font-black text-[34px] md:text-[44px] text-ink tracking-tight">4 bước là có tiền hoàn</h2>
              </div>
              <p className="text-mute text-[17px] max-w-xl mx-auto">Không cần cài thêm gì, không cần thao tác phức tạp.</p>
            </div>

            <ol className="relative flex flex-col gap-3xl before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/15">
              {STEPS.map((step, index) => (
                <li key={step.title} className="relative flex gap-xl pl-0">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-primary text-[20px] font-black text-primary shadow-sm">
                    {index + 1}
                  </span>
                  <div className="pt-sm">
                    <h3 className="font-bold text-[21px] text-ink mb-xs">{step.title}</h3>
                    <p className="text-mute text-[15px] leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why Nhím — Full-width bold statement */}
        <section id="features" className="py-3xl bg-white border-t border-primary/5 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-lg">
            {/* Section header */}
            <div className="text-center mb-3xl">
              <span className="inline-block bg-primary/10 text-primary text-[13px] font-bold px-md py-xs rounded-full mb-md">Tại sao chọn Nhím?</span>
              <h2 className="font-black text-[34px] md:text-[50px] text-ink tracking-tight leading-tight">
                Tiết kiệm thật — không phải<br className="hidden md:block" /> chiêu trò marketing
              </h2>
              <p className="text-mute text-[17px] mt-md max-w-lg mx-auto">Hàng triệu đơn Shopee đã được hoàn tiền thực sự về tài khoản ngân hàng của người dùng.</p>
            </div>

            {/* Hero stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-3xl">
              {[
                { value: "80%", label: "Hoa hồng chia lại cho bạn" },
                { value: "10K", label: "Rút tối thiểu chỉ 10.000đ" },
                { value: "24h", label: "Chuyển khoản trong 24 giờ" },
                { value: "0đ", label: "Hoàn toàn miễn phí" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gradient-to-br from-[#fdebf2] to-white rounded-[24px] p-xl text-center border border-primary/10 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="font-black text-[36px] md:text-[44px] text-primary leading-none mb-xs">{stat.value}</div>
                  <div className="text-mute text-[13px] leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature cards — 3-column */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Card 1: Rút tiền */}
              <div className="bg-[#fdebf2] rounded-[32px] p-2xl flex flex-col gap-lg hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-primary/15">
                  <Wallet className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-black text-[22px] text-ink mb-xs">Rút tiền siêu tốc</h3>
                  <p className="text-mute text-[14px] leading-relaxed">Tiền hoàn về thẳng ngân hàng trong 24h. Ngưỡng rút thấp nhất thị trường: chỉ từ 10.000đ, không phí ẩn.</p>
                </div>
                <div className="mt-auto flex items-center gap-xs text-primary font-bold text-[13px]">
                  <ShieldCheck size={14} />
                  Đã xác thực bởi Shopee
                </div>
              </div>

              {/* Card 2: Bot Telegram */}
              <div className="bg-[#f0faf4] rounded-[32px] p-2xl flex flex-col gap-lg hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                    <Send className="text-emerald-500" size={28} />
                  </div>
                  <img src="/nhimthongbao.png" alt="" className="h-12 w-12 object-contain" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-black text-[22px] text-ink mb-xs">Bot Telegram thông minh</h3>
                  <p className="text-mute text-[14px] leading-relaxed">Gửi link vào chat, bot tự đổi sang link hoàn tiền và thông báo ngay khi đơn được duyệt — không cần mở app.</p>
                </div>
                <div className="mt-auto flex items-center gap-xs text-emerald-600 font-bold text-[13px]">
                  <Sparkles size={14} />
                  Tự động 100%, miễn phí
                </div>
              </div>

              {/* Card 3: Voucher */}
              <div className="bg-[#fdf4ff] rounded-[32px] p-2xl flex flex-col gap-lg hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-purple-100">
                    <TicketPercent className="text-purple-500" size={28} />
                  </div>
                  <img src="/nhimmagiamgia.png" alt="" className="h-12 w-12 object-contain" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-black text-[22px] text-ink mb-xs">Kho voucher độc quyền</h3>
                  <p className="text-mute text-[14px] leading-relaxed">Hàng ngàn mã Freeship và giảm giá sâu tới 50% cập nhật liên tục — dùng kết hợp với hoàn tiền để tiết kiệm gấp đôi.</p>
                </div>
                <div className="mt-auto flex items-center gap-xs text-purple-600 font-bold text-[13px]">
                  <Gift size={14} />
                  Cập nhật hàng ngày
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid — detailed */}
        <section className="py-3xl bg-canvas border-t border-primary/5">
          <div className="max-w-[1200px] mx-auto px-lg">
            <div className="text-center mb-3xl">
              <h2 className="font-black text-[28px] md:text-[36px] text-ink tracking-tight">Mọi thứ bạn cần để mua sắm thông minh</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
              {FEATURES.map((f) => (
                <div key={f.title} className="group flex gap-lg p-xl rounded-[24px] bg-white border border-primary/8 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <f.icon size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-ink mb-xs">{f.title}</h3>
                    <p className="text-mute text-[13px] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-3xl bg-[#fdebf2]/30 border-t border-primary/5">
          <div className="max-w-[760px] mx-auto px-lg">
            <div className="text-center mb-2xl">
              <span className="inline-block bg-primary/10 text-primary text-[13px] font-bold px-md py-xs rounded-full mb-md">FAQ</span>
              <h2 className="font-black text-[30px] md:text-[38px] text-ink tracking-tight">Câu hỏi thường gặp</h2>
            </div>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* CTA — full-width gradient banner */}
        <section className="py-3xl bg-gradient-to-br from-primary via-[#e91e8c] to-primary-active relative overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[900px] mx-auto px-lg text-center">
            <img src="/nhimchaomung.png" alt="Nhím" className="h-20 w-20 object-contain mx-auto mb-xl rounded-full shadow-xl" />
            <h2 className="font-black text-[36px] md:text-[52px] text-white leading-tight tracking-tight mb-lg">
              Bắt đầu kiếm tiền hoàn<br className="hidden md:block" /> từ hôm nay — miễn phí
            </h2>
            <p className="text-white/80 text-[18px] mb-3xl max-w-lg mx-auto leading-relaxed">
              Chỉ mất 1 phút đăng ký. Không thẻ tín dụng. Không điều kiện ràng buộc.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-md mb-3xl">
              {[
                { icon: ShieldCheck, label: "Bảo mật 100%" },
                { icon: Wallet, label: "Rút tiền 24/7" },
                { icon: Gift, label: "Miễn phí mãi mãi" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-xs bg-white/15 backdrop-blur-sm text-white px-md py-xs rounded-full text-[13px] font-semibold border border-white/20">
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-sm bg-white text-primary font-black text-[17px] px-3xl py-lg rounded-2xl shadow-2xl hover:-translate-y-1 hover:shadow-white/30 transition-all"
              >
                Đăng ký miễn phí
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-sm bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold text-[17px] px-3xl py-lg rounded-2xl hover:bg-white/25 transition-all"
              >
                Đã có tài khoản
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
      <PublicFloatingSupport />
    </div>
  );
}
