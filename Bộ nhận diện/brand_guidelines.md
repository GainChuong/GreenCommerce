# Brand Guidelines: EcoSynth Commerce (Light Mode)

Bộ nhận diện thương hiệu được thiết kế theo phong cách **Light Neo-Brutalism**, kết hợp tính biên tập thời trang cao cấp với giao diện dữ liệu kỹ thuật sắc sảo của trí tuệ nhân tạo (AI), trên một nền tảng tươi sáng và tích cực đại diện cho sản phẩm sinh thái xanh.

## 1. Triết lý Thiết kế (Design Philosophy)
* **Tươi sáng & Tự nhiên (Bright & Raw):** Sử dụng nền giấy sáng (`#F7F9F6`) gợi liên tưởng đến giấy tái chế, kết hợp với các đường viền đen mực sắc nét đại diện cho cấu trúc chắc chắn của AI.
* **Không thỏa hiệp (Uncompromising):** Không sử dụng thiết kế bo góc tròn trịa an toàn, đổ bóng mờ nhạt hay các dải màu chuyển sắc (gradient) yếu ớt.
* **Bản tin Biên tập Sinh thái (Eco-Editorial Tech):** Giao diện mang hơi hướng tạp chí thời trang hoặc báo cáo khoa học xanh có độ tương phản cao, hiện đại và sạch sẽ.

## 2. Màu sắc (Color Palette)
Chúng tôi **không sử dụng màu tím (Purple Ban)** và từ chối màu xanh lá cây xỉn hay mờ nhạt của các dự án môi trường truyền thống. Thay vào đó, chúng tôi dùng màu sắc phẳng, rực rỡ và có tính tương phản cực độ.

| Tên | HEX | RGB | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Paper White** | `#F7F9F6` | `247, 249, 246` | Nền chủ đạo của toàn trang (Background). Tạo cảm giác sạch sẽ, sáng sủa và sinh thái. |
| **Pure Surface** | `#FFFFFF` | `255, 255, 255` | Nền các thẻ thông tin (Card, Section Surface). |
| **Ink Black** | `#0B1410` | `11, 20, 16` | Chữ chính (Primary Text) và đường viền (Borders). Màu đen xanh đậm như mực in chất lượng cao. |
| **Bright Eco Green** | `#00C853` | `0, 200, 83` | Màu nhấn chính (Primary Accent). Dùng cho trạng thái tích cực, điểm xanh, nút bấm quan trọng. |
| **Acid Lemon** | `#D4FF00` | `212, 255, 0` | Màu nhấn công nghệ (Accent/Highlight). Dùng để highlight từ khóa cảm xúc AI, badge nổi bật. |
| **Borderline Grey** | `#DCE3DD` | `220, 227, 221` | Đường viền phụ hoặc dải phân cách nhẹ nhàng. |
| **Alert Coral** | `#FF4D00` | `255, 77, 0` | Màu cảnh báo, phàn nàn của khách hàng, review giả mạo (Tương phản mạnh). |

## 3. Nghệ thuật chữ (Typography)
Sự kết hợp của ba trường phái chữ mang lại cảm giác vừa cổ điển vừa công nghệ:

* **Tiêu đề (Headings) - Tính Tự nhiên & Cao cấp:**
  * **Font:** *Playfair Display* (hoặc *PP Editorial New*)
  * **Đặc điểm:** Serif (chữ có chân), nét thanh nét đậm sang trọng, đại diện cho phần "Eco" và tính thời trang cao cấp.
* **Thông số dữ liệu & Label - Tính Công nghệ & AI:**
  * **Font:** *JetBrains Mono* (hoặc *IBM Plex Mono*)
  * **Đặc điểm:** Monospace (chữ đơn cách), đại diện cho phần thuật toán "AI", Green Trust Score, Sentiment Data, Badges.
* **Nội dung (Body Text) - Tính Hiện đại & Dễ đọc:**
  * **Font:** *Space Grotesk* (hoặc *Inter*)
  * **Đặc điểm:** Sans-serif hình học góc cạnh, hiện đại, tối giản và cực kỳ dễ đọc trên màn hình sáng.

## 4. Hình khối & Bố cục (Geometry & Bounding)
* **Góc sắc nét (Sharp Edges):** Border radius `0px` hoặc tối đa `2px`. Đại diện cho sự chính xác của thuật toán AI.
* **Đổ bóng cứng (Hard Shadow):** Sử dụng bóng đổ cứng không nhạt nhòa (`box-shadow: 4px 4px 0px 0px #0B1410`), tạo hiệu ứng 3D Neo-Brutalism nổi bật cho thẻ thông tin.
* **Đường viền thô (Raw Borders):** Sử dụng các đường viền dày `2px` màu đen mực để phân tách các khu vực nội dung, KHÔNG dùng bóng mờ ảo (soft shadows) hay kính mờ (glassmorphism).

## 5. UI Components Đặc thù (Signature Elements)
* **AI Summary Card:** Vùng Typography lớn sử dụng font Serif trên nền trắng (`#FFFFFF`), các từ khóa cốt lõi được bôi màu vàng chanh Acid (`#D4FF00`) và viền đen thô bao quanh để nổi bật thông điệp tổng hợp.
* **Aspect-Based Bars:** Các thanh đánh giá theo thuộc tính sử dụng viền đen thô, phân tách rõ rệt tỷ lệ Tích cực (màu xanh lá `#00C853`) và Tiêu cực (màu cam đỏ `#FF4D00`).
* **Green Trust Badge (Tem Chứng Nhận Xanh):** Tem hình học thiết kế giống nhãn kỹ thuật (Industrial Decal) trên các thùng hàng tái chế, sử dụng chữ Monospace, hiển thị điểm chữ lớn như **A+** với bảng đo lường carbon và tái chế chi tiết.
* **Alert Center (Seller):** Một bảng báo cáo viền đen dày, sử dụng tông màu cam đỏ nhạt nền (`#FFF0EB`) cho các sự kiện khẩn cấp, hiển thị log dạng dòng văn bản monospace của AI để tạo cảm giác trực quan của một hệ thống vận hành thời gian thực.

## 6. Những điều KHÔNG được làm (Anti-Patterns / Don'ts)
* 🚫 **Không dùng bóng mờ (No Soft Shadows):** Tuyệt đối không dùng bóng mờ nhạt làm yếu đi độ sắc sảo của thiết kế Neo-Brutalism.
* 🚫 **Không bo góc lớn (No Large Rounded Corners):** Giới hạn góc bo ở mức tối thiểu để giao diện không bị "trẻ con hóa" mà vẫn mang tính quyết đoán của nền tảng B2B/B2C hiện đại.
* 🚫 **Không dùng các màu gradient dịu nhẹ:** Không trộn màu chuyển sắc mượt mà làm mất đi tinh thần phẳng và tối giản của bộ nhận diện thương hiệu.
* 🚫 **Không thiết kế Bento Grid an toàn:** Tránh xếp các hộp vuông bo tròn nằm ngay ngắn thẳng hàng. Hãy phá vỡ lưới, cho các khối đè hoặc chồng lên nhau một cách tự nhiên.
* 🚫 **Không dùng ảnh Hero chia đôi chữ (Split Header):** Phải dùng hình ảnh lồng ghép dưới Text hoặc xuyên thấu vào chữ để tạo chiều sâu trực quan.
* 🚫 **Không viết Copywriting sáo rỗng:** Thay vì viết "Sản phẩm chất lượng cao", hãy dùng số liệu cụ thể của AI: "Sentiment: 92% Positive", "Carbon Offset: -12.4kg".
