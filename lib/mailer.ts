import nodemailer from "nodemailer";

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendMail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; simulated: boolean; error?: string }> {
  const transporter = getTransporter();
  const fromName = process.env.SMTP_FROM_NAME || "Affiliate Hoan Tien";
  const fromAddress = process.env.SMTP_USER;

  if (!transporter || !fromAddress) {
    // Chưa cấu hình SMTP — không throw, chỉ báo simulated để không làm hỏng
    // luồng chính (giống pattern notifyCustomerTelegram best-effort).
    console.error(`[mailer] Bỏ qua gửi mail tới ${params.to} — SMTP chưa được cấu hình.`);
    return { ok: true, simulated: true, error: "SMTP chưa được cấu hình" };
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    return { ok: true, simulated: false };
  } catch (error) {
    // Các lời gọi sendMail() ở nơi khác dùng "void sendMail(...)" không chờ
    // kết quả, nên nếu không log ở đây thì lỗi gửi mail sẽ biến mất hoàn
    // toàn — không ai biết mail đã không gửi được, kể cả xem log server.
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[mailer] Gửi mail tới ${params.to} thất bại: ${message}`);
    return { ok: false, simulated: false, error: message };
  }
}

const BRAND_COLOR = "#EC407A";

function emailShell(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#fdf3f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf3f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#fdebf2 0%,#fcdae7 50%,#fbd6e6 100%);padding:32px 32px 24px;text-align:center;">
              <div style="font-size:15px;font-weight:800;color:${BRAND_COLOR};letter-spacing:0.5px;text-transform:uppercase;">Affiliate Hoàn Tiền</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#fff6f9;text-align:center;">
              <div style="font-size:12px;color:#a87a8d;">Đây là email tự động, vui lòng không trả lời trực tiếp email này.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function buildPasswordResetEmail(params: { fullName: string; resetUrl: string; expiresInMinutes: number }): string {
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">Đặt lại mật khẩu</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5c3747;">Xin chào <strong>${escapeHtml(params.fullName)}</strong>,</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#5c3747;">
      Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Bấm nút bên dưới để tạo mật khẩu mới
      (liên kết có hiệu lực trong ${params.expiresInMinutes} phút):
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr>
        <td style="border-radius:16px;background:linear-gradient(135deg,${BRAND_COLOR},#c2185b);">
          <a href="${params.resetUrl}" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:16px;">
            Đặt lại mật khẩu
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#a87a8d;">
      Nếu nút không hoạt động, sao chép đường dẫn sau vào trình duyệt:
    </p>
    <p style="margin:0 0 24px;font-size:12px;line-height:1.6;color:${BRAND_COLOR};word-break:break-all;">${params.resetUrl}</p>
    <p style="margin:0;font-size:12px;line-height:1.6;color:#a87a8d;">
      Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này — mật khẩu hiện tại của bạn vẫn an toàn.
    </p>
  `);
}

export function buildPasswordChangedEmail(params: { fullName: string }): string {
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">Mật khẩu đã được thay đổi</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5c3747;">Xin chào <strong>${escapeHtml(params.fullName)}</strong>,</p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#5c3747;">
      Mật khẩu tài khoản của bạn vừa được thay đổi thành công. Nếu đây không phải là bạn, vui lòng liên hệ hỗ trợ ngay lập tức.
    </p>
  `);
}

export function buildAdminWithdrawRequestEmail(params: {
  customerName: string;
  customerCode: string;
  amount: number;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">🔔 Khách yêu cầu rút tiền</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5c3747;">
      Khách hàng <strong>${escapeHtml(params.customerName)}</strong> (<code>${escapeHtml(params.customerCode)}</code>) vừa gửi yêu cầu rút tiền.
    </p>
    <p style="margin:0 0 24px;font-size:28px;font-weight:900;color:${BRAND_COLOR};">${amountText}</p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#a87a8d;">
      Vào trang Admin → Thanh toán để xem chi tiết và tạo phiếu.
    </p>
  `);
}

export function buildAdminNewRegistrationEmail(params: {
  fullName: string;
  email: string;
  customerCode: string;
  phone?: string | null;
  source: "email" | "google";
  referredByCode?: string | null;
}): string {
  const sourceLabel = params.source === "google" ? "Đăng ký qua Google" : "Đăng ký qua Email";
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">🎉 Khách hàng mới đăng ký</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;font-size:13px;color:#5c3747;">
      <tr>
        <td style="padding:4px 0;">Họ tên</td>
        <td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.fullName)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;">Email</td>
        <td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.email)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;">Mã khách hàng</td>
        <td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.customerCode)}</td>
      </tr>
      ${
        params.phone
          ? `<tr><td style="padding:4px 0;">Điện thoại</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.phone)}</td></tr>`
          : ""
      }
      <tr>
        <td style="padding:4px 0;">Nguồn</td>
        <td style="padding:4px 0;text-align:right;font-weight:700;">${sourceLabel}</td>
      </tr>
      ${
        params.referredByCode
          ? `<tr><td style="padding:4px 0;">Được giới thiệu bởi</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.referredByCode)}</td></tr>`
          : ""
      }
    </table>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#a87a8d;">
      Vào trang Admin → Khách hàng để xem chi tiết.
    </p>
  `);
}

export function buildCustomerWithdrawRequestEmail(params: {
  fullName: string;
  amount: number;
  bankName?: string | null;
  bankAccountNumber?: string | null;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  const maskedAccount = params.bankAccountNumber
    ? "•••• " + params.bankAccountNumber.slice(-4)
    : null;
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">🔒 Yêu cầu rút tiền vừa được tạo</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5c3747;">Xin chào <strong>${escapeHtml(params.fullName)}</strong>,</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5c3747;">
      Chúng tôi vừa ghi nhận một yêu cầu rút tiền từ tài khoản của bạn:
    </p>
    <p style="margin:0 0 16px;font-size:28px;font-weight:900;color:${BRAND_COLOR};">${amountText}</p>
    ${
      params.bankName || maskedAccount
        ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;font-size:13px;color:#5c3747;">
            ${
              params.bankName
                ? `<tr><td style="padding:4px 0;">Ngân hàng</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.bankName)}</td></tr>`
                : ""
            }
            ${
              maskedAccount
                ? `<tr><td style="padding:4px 0;">Tài khoản nhận</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(maskedAccount)}</td></tr>`
                : ""
            }
          </table>`
        : ""
    }
    <div style="margin:0 0 8px;padding:14px 16px;border-radius:12px;background:#fef2f2;border:1px solid #fecaca;">
      <p style="margin:0;font-size:13px;line-height:1.6;color:#991b1b;">
        ⚠️ Nếu bạn <strong>không thực hiện</strong> yêu cầu này, tài khoản của bạn có thể đã bị người khác truy cập.
        Vui lòng liên hệ hỗ trợ ngay lập tức để chúng tôi tạm khóa yêu cầu và bảo vệ số dư của bạn.
      </p>
    </div>
  `);
}

export function buildPaymentSentEmail(params: {
  fullName: string;
  amount: number;
  paymentCode: string;
  bankAccountNumber?: string | null;
  transferReference?: string | null;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  return emailShell(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#2d1420;">💸 Tiền đã được chuyển!</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5c3747;">Xin chào <strong>${escapeHtml(params.fullName)}</strong>,</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5c3747;">
      Chúng tôi vừa chuyển khoản thành công số tiền hoàn của bạn:
    </p>
    <p style="margin:0 0 20px;font-size:28px;font-weight:900;color:${BRAND_COLOR};">${amountText}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;font-size:13px;color:#5c3747;">
      <tr>
        <td style="padding:4px 0;">Mã phiếu</td>
        <td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.paymentCode)}</td>
      </tr>
      ${
        params.bankAccountNumber
          ? `<tr><td style="padding:4px 0;">Tài khoản nhận</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.bankAccountNumber)}</td></tr>`
          : ""
      }
      ${
        params.transferReference
          ? `<tr><td style="padding:4px 0;">Mã giao dịch</td><td style="padding:4px 0;text-align:right;font-weight:700;">${escapeHtml(params.transferReference)}</td></tr>`
          : ""
      }
    </table>
    <p style="margin:0;font-size:12px;line-height:1.6;color:#a87a8d;">
      Cảm ơn bạn đã đồng hành cùng hệ thống hoàn tiền! Kiểm tra tài khoản ngân hàng của bạn trong ít phút tới.
    </p>
  `);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
