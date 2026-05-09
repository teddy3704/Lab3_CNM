from pathlib import Path
from datetime import date

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "Bai_nop_Lab3_PhanVanTien_2212472.pdf"
PAGE_SIZE = landscape(A4)
PAGE_WIDTH, PAGE_HEIGHT = PAGE_SIZE
MARGIN_X = 36

SCREENSHOTS = [
    ("01-trang-chu.png", "Trang chủ", "/", "Giao diện hero premium, điều hướng nhanh và command center."),
    ("02-blog.png", "Blog", "/blog", "Danh sách bài viết lấy dữ liệu thật từ JSONPlaceholder."),
    ("03-blog-chi-tiet.png", "Blog chi tiết", "/blog/1", "Route động hiển thị bài viết, tác giả và bình luận."),
    ("04-du-an.png", "Dự án", "/projects", "Trang portfolio trình bày các dự án theo hệ card và badge."),
    ("05-luu-but-server.png", "Lưu bút server-first", "/guestbook", "Guestbook dùng Server Actions để gửi và xoá dữ liệu."),
    ("06-luu-but-client.png", "Lưu bút client-side", "/guestbook-client", "Guestbook đối chiếu bằng fetch và API route phía client."),
    ("07-lien-he.png", "Liên hệ", "/contact", "Trang liên hệ với form thật và kiểm tra dữ liệu bằng Zod."),
]


def register_font() -> str:
    candidates = [
        Path(r"C:\Windows\Fonts\arial.ttf"),
        Path(r"C:\Windows\Fonts\Arial.ttf"),
        Path(r"C:\Windows\Fonts\segoeui.ttf"),
    ]
    for font_path in candidates:
        if font_path.exists():
            pdfmetrics.registerFont(TTFont("SubmissionFont", str(font_path)))
            return "SubmissionFont"
    return "Helvetica"


def draw_cover(pdf: canvas.Canvas, font_name: str) -> None:
    pdf.setFillColor(HexColor("#F7F2EA"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0F766E"))
    pdf.roundRect(MARGIN_X, PAGE_HEIGHT - 90, 170, 28, 14, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setFont(font_name, 11)
    pdf.drawString(MARGIN_X + 16, PAGE_HEIGHT - 72, "HỒ SƠ NỘP BÀI")

    pdf.setFillColor(HexColor("#17202D"))
    pdf.setFont(font_name, 24)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 130, "Lab 3 CNM - Website Portfolio/Blog Premium")

    pdf.setFillColor(HexColor("#5B6777"))
    pdf.setFont(font_name, 12)
    text = pdf.beginText(MARGIN_X, PAGE_HEIGHT - 165)
    for line in [
        "Tài liệu này tổng hợp các ảnh chụp màn hình của website đã hoàn thiện để phục vụ nộp bài.",
        "Dự án được xây dựng bằng Next.js App Router với route động, Server Actions, API Routes,",
        "form validation và hệ thống giao diện premium đồng bộ.",
    ]:
        text.textLine(line)
    pdf.drawText(text)

    card_y = PAGE_HEIGHT - 290
    cards = [
        ("Họ tên", "Phan Văn Tiến"),
        ("MSSV", "2212472"),
        ("Lớp", "CTK46PM"),
        ("Repository", "github.com/teddy3704/Lab3_CNM"),
    ]

    for index, (label, value) in enumerate(cards):
        col = index % 2
        row = index // 2
        x = MARGIN_X + col * 350
        y = card_y - row * 92
        pdf.setFillColor(HexColor("#FFFFFF"))
        pdf.setStrokeColor(HexColor("#D8DDD4"))
        pdf.roundRect(x, y, 310, 68, 16, stroke=1, fill=1)
        pdf.setFillColor(HexColor("#5B6777"))
        pdf.setFont(font_name, 10)
        pdf.drawString(x + 16, y + 47, label.upper())
        pdf.setFillColor(HexColor("#17202D"))
        pdf.setFont(font_name, 13)
        pdf.drawString(x + 16, y + 24, value)

    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setStrokeColor(HexColor("#D8DDD4"))
    pdf.roundRect(MARGIN_X, 72, PAGE_WIDTH - MARGIN_X * 2, 110, 18, stroke=1, fill=1)
    pdf.setFillColor(HexColor("#5B6777"))
    pdf.setFont(font_name, 10)
    pdf.drawString(MARGIN_X + 16, 154, "NỘI DUNG ẢNH CHỤP")
    pdf.setFillColor(HexColor("#17202D"))
    pdf.setFont(font_name, 12)
    caption_text = pdf.beginText(MARGIN_X + 16, 130)
    for line in [
        "Trang chủ, blog, blog chi tiết, dự án, lưu bút server-first, lưu bút client-side và liên hệ.",
        f"Ngày xuất tài liệu: {date.today().strftime('%d/%m/%Y')}.",
    ]:
        caption_text.textLine(line)
    pdf.drawText(caption_text)

    pdf.showPage()


def draw_screenshot_page(pdf: canvas.Canvas, font_name: str, image_path: Path, title: str, route: str, caption: str) -> None:
    pdf.setFillColor(HexColor("#F7F2EA"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#17202D"))
    pdf.setFont(font_name, 21)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 34, title)

    pdf.setFillColor(HexColor("#0F766E"))
    pdf.roundRect(PAGE_WIDTH - 150, PAGE_HEIGHT - 44, 110, 22, 11, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setFont(font_name, 10)
    pdf.drawCentredString(PAGE_WIDTH - 95, PAGE_HEIGHT - 36, route)

    pdf.setFillColor(HexColor("#5B6777"))
    pdf.setFont(font_name, 11)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 56, caption)

    frame_x = MARGIN_X
    frame_y = 44
    frame_width = PAGE_WIDTH - MARGIN_X * 2
    frame_height = PAGE_HEIGHT - 120

    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setStrokeColor(HexColor("#D8DDD4"))
    pdf.roundRect(frame_x, frame_y, frame_width, frame_height, 18, stroke=1, fill=1)

    with Image.open(image_path) as image:
        image_width, image_height = image.size

    scale = min((frame_width - 16) / image_width, (frame_height - 16) / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    draw_x = frame_x + (frame_width - draw_width) / 2
    draw_y = frame_y + (frame_height - draw_height) / 2

    pdf.drawImage(ImageReader(str(image_path)), draw_x, draw_y, draw_width, draw_height, preserveAspectRatio=True, mask="auto")
    pdf.showPage()


def main() -> None:
    font_name = register_font()
    pdf = canvas.Canvas(str(OUTPUT), pagesize=PAGE_SIZE)
    pdf.setTitle("Bài nộp Lab 3 - Phan Văn Tiến")
    draw_cover(pdf, font_name)

    for filename, title, route, caption in SCREENSHOTS:
        image_path = ROOT / filename
        if image_path.exists():
            draw_screenshot_page(pdf, font_name, image_path, title, route, caption)

    pdf.save()
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    main()
