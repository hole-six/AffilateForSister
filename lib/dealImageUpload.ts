import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB — đủ cho ảnh chụp Shopee, tránh timeout/413 khi vượt giới hạn Nginx.

export class DealImageUploadError extends Error {}

// Lưu ảnh deal admin upload vào public/uploads/deals — tách riêng để bọc lỗi
// filesystem (quyền ghi, disk đầy...) thành thông báo rõ ràng thay vì để lộ
// 500 trống rỗng ra client (nguyên nhân khiến admin chỉ thấy "Có lỗi xảy ra").
export async function saveDealImage(imageFile: File): Promise<string> {
  if (imageFile.size > MAX_UPLOAD_BYTES) {
    throw new DealImageUploadError("Ảnh quá lớn (tối đa 8MB), vui lòng chọn ảnh nhỏ hơn.");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "deals");
  const ext = imageFile.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const filename = `${randomUUID()}.${ext}`;

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), Buffer.from(await imageFile.arrayBuffer()));
  } catch (err) {
    throw new DealImageUploadError(
      `Không lưu được ảnh lên server: ${err instanceof Error ? err.message : "lỗi không xác định"}`
    );
  }

  return `/uploads/deals/${filename}`;
}
