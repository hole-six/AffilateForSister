import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LandingPage } from "@/components/marketing/LandingPage";

export const metadata: Metadata = {
  title: "Nhím — Mua sắm Shopee nhận hoàn tiền tự động",
  description:
    "Dán link Shopee, nhận link hoàn tiền tự động. Rút tiền từ 10.000đ, tích hợp bot Telegram, miễn phí hoàn toàn.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nhím — Mua sắm thông minh, nhận hoàn tiền tự động",
    description:
      "Nền tảng affiliate hoàn tiền cho Shopee. Rút tiền từ 10.000đ, tích hợp bot Telegram.",
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Nhím",
    images: [{ url: "/landingpage.png", width: 1630, height: 965, alt: "Nhím - Nền tảng hoàn tiền affiliate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhím — Mua sắm thông minh, nhận hoàn tiền tự động",
    description:
      "Nền tảng affiliate hoàn tiền cho Shopee. Rút tiền từ 10.000đ, tích hợp bot Telegram.",
    images: ["/landingpage.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://nhimhoahong.site/#website",
      url: "https://nhimhoahong.site",
      name: "Nhím",
      description: "Nền tảng affiliate hoàn tiền cho Shopee tại Việt Nam.",
      inLanguage: "vi-VN",
    },
    {
      "@type": "Organization",
      "@id": "https://nhimhoahong.site/#organization",
      name: "Nhím",
      url: "https://nhimhoahong.site",
      logo: "https://nhimhoahong.site/nhimchaomung.png",
      telephone: "+84965965439",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84965965439",
        contactType: "customer service",
        areaServed: "VN",
        availableLanguage: "Vietnamese",
      },
      sameAs: [
        "https://www.facebook.com/layeu.chicothe.169",
        "https://zalo.me/0898204657",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Hệ thống hoạt động như thế nào?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Khi bạn mua hàng qua link hoàn tiền của hệ thống, sàn thương mại điện tử sẽ trả một khoản hoa hồng affiliate. Chúng tôi chia lại phần lớn khoản này cho bạn dưới dạng tiền hoàn vào ví.",
          },
        },
        {
          "@type": "Question",
          name: "Rút tiền tối thiểu bao nhiêu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mức rút tối thiểu là 10.000đ. Bạn có thể nhận về tài khoản ngân hàng sau khi đơn hàng được duyệt.",
          },
        },
        {
          "@type": "Question",
          name: "Có mất phí sử dụng không?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hoàn toàn miễn phí — không thu phí đăng ký, tạo link hay rút tiền.",
          },
        },
        {
          "@type": "Question",
          name: "Hệ thống hỗ trợ sàn nào?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hiện tại hệ thống tập trung đối soát Shopee để đảm bảo hoàn tiền chính xác và nhanh nhất.",
          },
        },
      ],
    },
  ],
};

export default async function RootPage() {
  const session = await getSession();

  if (session) {
    redirect(session.role === "admin" ? "/admin" : "/app");
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingPage />
    </>
  );
}
