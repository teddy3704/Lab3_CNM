export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const guestbookEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Nguyễn Văn B",
    message: "Website đẹp, bố cục rõ ràng và có hướng nâng cấp rất tốt.",
    createdAt: new Date("2026-05-01T08:00:00.000Z").toISOString(),
  },
  {
    id: "2",
    name: "Trần Thị C",
    message: "Guestbook hoạt động mượt, cách tổ chức mã nguồn khá chuyên nghiệp.",
    createdAt: new Date("2026-05-03T09:30:00.000Z").toISOString(),
  },
  {
    id: "3",
    name: "Lê Văn D",
    message: "Phần blog lấy dữ liệu thật và giao diện đọc nội dung rất ổn định, dễ theo dõi.",
    createdAt: new Date("2026-05-05T14:15:00.000Z").toISOString(),
  },
];