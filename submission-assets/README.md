# Submission Assets

Thư mục này chứa bộ hồ sơ nộp bài cho Lab 3 CNM.

## Thành phần

- `Bai_nop_Lab3_PhanVanTien_2212472.pdf`: file PDF nộp bài chính.
- `01-trang-chu.png` đến `07-lien-he.png`: ảnh chụp các giao diện quan trọng của website.
- `build_submission_pdf.py`: script Python dùng để dựng lại file PDF từ các ảnh chụp.
- `lab3-submission-report.html`: file báo cáo HTML dùng trong quá trình chuẩn bị tài liệu nộp bài.

## Cách dựng lại PDF

Từ thư mục gốc của dự án, chạy:

```bash
.venv\Scripts\python.exe submission-assets\build_submission_pdf.py
```

Script sẽ tự đọc các ảnh trong cùng thư mục và sinh lại file PDF đầu ra.

## Ghi chú

- PDF hiện có 8 trang: 1 trang bìa và 7 trang ảnh chụp giao diện.
- Bộ tài liệu này được chuẩn bị để phục vụ nộp bài và lưu trữ cùng repository.