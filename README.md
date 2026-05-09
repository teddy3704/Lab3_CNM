# Lab 3 CNM - Website Portfolio/Blog Premium

Website được xây dựng bằng Next.js App Router theo hướng trình bày như một sản phẩm hoàn chỉnh, không chỉ dừng ở mức bài lab cơ bản. Dự án kết hợp giao diện premium, dữ liệu thật, route động, Server Actions, API Routes và hệ component tái sử dụng để tạo thành một website cá nhân có chiều sâu kỹ thuật.

## Thông tin sinh viên

- Họ tên: Phan Văn Tiến
- MSSV: 2212472
- Lớp: CTK46PM
- Email: 2212472@dlu.edu.vn
- GitHub repo: https://github.com/teddy3704/Lab3_CNM

## Mục tiêu dự án

- Xây dựng website cá nhân theo phong cách portfolio/blog bằng Next.js 16.
- Trình bày giao diện ở mức chỉnh chu, đồng bộ và có bản sắc riêng.
- Thể hiện rõ các năng lực quan trọng của App Router: data fetching, route động, loading state, error boundary, API Routes và Server Actions.
- Cá nhân hoá toàn bộ nội dung theo đúng thông tin sinh viên để sẵn sàng nộp bài và demo.

## Tính năng nổi bật

- Trang chủ phong cách premium với khối giới thiệu, dấu ấn cá nhân và command center mô tả mức sẵn sàng triển khai.
- Blog dùng dữ liệu thật từ JSONPlaceholder, có danh sách bài viết, route chi tiết động, loading UI, error UI và trang không tìm thấy.
- Guestbook theo hai hướng triển khai:
	- Server-first với Server Actions.
	- Client-side với `fetch` tới API Routes.
- Form liên hệ dùng Server Actions kết hợp Zod để kiểm tra dữ liệu và phản hồi trạng thái gửi.
- Hệ thống UI component riêng gồm `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Label`, `Separator`.
- Giao diện dùng typography, ambient background, glass surface và motion nhẹ để tạo cảm giác sản phẩm cao cấp.

## Công nghệ sử dụng

- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Zod
- Radix UI primitives
- Lucide React
- `class-variance-authority`, `clsx`, `tailwind-merge`

## Các route chính

| Route | Mô tả |
| --- | --- |
| `/` | Trang chủ premium, giới thiệu hồ sơ sinh viên và command center |
| `/blog` | Danh sách bài viết lấy từ JSONPlaceholder |
| `/blog/[id]` | Trang chi tiết bài viết, tác giả và bình luận |
| `/projects` | Trang trưng bày các dự án theo ngôn ngữ portfolio |
| `/guestbook` | Guestbook theo hướng server-first với Server Actions |
| `/guestbook-client` | Guestbook theo hướng client-side với API Routes |
| `/contact` | Trang liên hệ có form kiểm tra dữ liệu |
| `/api/guestbook` | API lấy danh sách và tạo lời nhắn |
| `/api/guestbook/[id]` | API xoá hoặc cập nhật lời nhắn |

## Cấu trúc chức năng chính

- `src/app`: các route App Router, loading UI, error boundary, API routes và Server Actions.
- `src/components`: các component giao diện và khối chức năng dùng lại trên toàn site.
- `src/components/ui`: bộ UI primitives tự xây dựng cho dự án.
- `src/lib`: utility functions, validation schema và hồ sơ cá nhân.
- `src/data`: dữ liệu guestbook mẫu dùng trong runtime.
- `src/types`: kiểu dữ liệu cho blog và các API response.

## Cách chạy dự án

### 1. Cài dependency

```bash
npm install
```

### 2. Chạy môi trường phát triển

```bash
npm run dev
```

Mở trình duyệt tại:

```bash
http://localhost:3000
```

### 3. Kiểm tra lint

```bash
npm run lint
```

### 4. Build production

```bash
npm run build
```

### 5. Chạy bản production cục bộ

```bash
npm run start
```

## Trạng thái xác minh

Dự án đã được kiểm tra bằng các lệnh sau:

```bash
npm run lint
npm run build
```

Kết quả: pass sạch ở trạng thái hiện tại trước khi push lên GitHub.

## Ghi chú triển khai

- Guestbook hiện lưu dữ liệu trong bộ nhớ runtime, nên dữ liệu sẽ reset khi server khởi động lại.
- Form liên hệ hiện mô phỏng xử lý phía server và ghi log ở server, chưa kết nối cơ sở dữ liệu hoặc email service thật.
- Blog sử dụng JSONPlaceholder nên dữ liệu bài viết, tác giả và bình luận được lấy từ API công khai.

## Giá trị kỹ thuật thể hiện trong bài lab

- Tổ chức code theo App Router hiện đại.
- Kết hợp Server Components, Client Components và route handlers đúng vai trò.
- Áp dụng validation rõ ràng bằng Zod.
- Xây dựng UI system nhất quán thay vì làm từng trang rời rạc.
- Nâng bài lab thành một sản phẩm có thể demo, kiểm tra và mở rộng tiếp.

## Repository

- GitHub: https://github.com/teddy3704/Lab3_CNM
- Branch chính: `main`

## Tác giả

Phan Văn Tiến

Sinh viên Công nghệ thông tin - CTK46PM
