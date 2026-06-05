import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  ecoScore: string;
  sentimentScore: number;
  positiveReviews: number;
}

function ProductCard({ id, name, category, price, image, ecoScore, sentimentScore, positiveReviews }: ProductCardProps) {
  return (
    <div style={{
      backgroundColor: "var(--card)",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid var(--border)",
      boxShadow: "0 10px 30px var(--shadow)",
      transition: "all 0.3s ease",
      position: "relative"
    }} className="card-hover">
      
      {/* Eco Score Badge */}
      <span style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        backgroundColor: "var(--primary)",
        color: "white",
        padding: "0.25rem 0.75rem",
        borderRadius: "30px",
        fontSize: "0.75rem",
        fontWeight: "700",
        zIndex: 2
      }}>
        Eco-Score: {ecoScore}
      </span>

      {/* Image */}
      <div style={{ position: "relative", height: "300px", width: "100%", overflow: "hidden" }}>
        <img 
          src={image} 
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease"
          }}
          className="product-img"
        />
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "0.25rem" }}>
          {category}
        </p>
        <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--foreground)" }}>
          {name}
        </h3>
        
        {/* Price & Sentiment Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--primary)" }}>
            {price}
          </span>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.35rem",
            backgroundColor: "var(--sentiment-pos-light)",
            padding: "0.25rem 0.6rem",
            borderRadius: "30px"
          }}>
            <i className="fa-solid fa-leaf" style={{ color: "var(--sentiment-pos)", fontSize: "0.8rem" }}></i>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--sentiment-pos)" }}>
              {sentimentScore}% Tích cực
            </span>
          </div>
        </div>

        <hr style={{ border: "0", borderTop: "1px solid var(--border)", marginBottom: "1rem" }} />

        {/* AI Insights Snippet */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <i className="fa-solid fa-face-smile" style={{ color: "var(--sentiment-pos)" }}></i>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Hơn {positiveReviews} khách hàng hài lòng về chất liệu tái sinh.
          </span>
        </div>

        <Link href={`/shop/${id}`} className="btn btn-outline" style={{ width: "100%", marginTop: "1.25rem", borderRadius: "10px" }}>
          Xem Chi Tiết & Đánh Giá AI
        </Link>
      </div>

    </div>
  );
}

export default function Home() {
  const featuredProducts = [
    {
      id: "1",
      name: "Áo Khoác Gió Recycled Ocean-Plastic",
      category: "Áo Khoác Nam/Nữ",
      price: "1,250,000 đ",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600",
      ecoScore: "A+",
      sentimentScore: 98,
      positiveReviews: 124
    },
    {
      id: "2",
      name: "Balo Leo Núi Eco-Trail 30L",
      category: "Phụ Kiện Dã Ngoại",
      price: "1,890,000 đ",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600",
      ecoScore: "A",
      sentimentScore: 95,
      positiveReviews: 89
    },
    {
      id: "3",
      name: "Áo Thun Polo Organic Cotton",
      category: "Áo Thun Unisex",
      price: "450,000 đ",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600",
      ecoScore: "A+",
      sentimentScore: 97,
      positiveReviews: 240
    }
  ];

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* HERO SECTION */}
      <section style={{
        position: "relative",
        height: "85vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden"
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1
        }} />

        <div className="container animate-fade-in-up" style={{ zIndex: 1 }}>
          <div style={{ maxWidth: "650px" }}>
            <span className="badge badge-accent" style={{ marginBottom: "1.5rem" }}>
              Chiến Dịch Bảo Vệ Hành Tinh
            </span>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: "1.1",
              fontWeight: "700",
              marginBottom: "1.5rem"
            }}>
              Thời trang Bền vững.<br />
              Trái đất Xanh tươi.
            </h1>
            <p style={{
              fontSize: "1.2rem",
              lineHeight: "1.6",
              marginBottom: "2.5rem",
              opacity: 0.9,
              fontFamily: "var(--font-sans)"
            }}>
              Khám phá bộ sưu tập quần áo chất liệu tái sinh 100% của ReFashion. Từng món đồ bạn chọn mua là một phiếu bầu bảo vệ hành tinh xanh của chúng ta.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/shop" className="btn btn-accent" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
                Mua sắm Sản Phẩm Xanh
              </Link>
              <Link href="/community" className="btn btn-outline" style={{ padding: "0.85rem 2rem", fontSize: "1rem", color: "white", borderColor: "white" }}>
                Quyên Góp & Tích GreenCoin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS DASHBOARD */}
      <section style={{
        marginTop: "-60px",
        zIndex: 10,
        position: "relative",
        paddingBottom: "3rem"
      }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)"
          }} className="glass">
            
            {/* Stat 1 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{
                backgroundColor: "var(--primary-light)",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <i className="fa-solid fa-cloud-arrow-down" style={{ fontSize: "1.5rem", color: "var(--primary)" }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--primary)" }}>15.4 Tấn</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Khí thải CO₂ đã cắt giảm</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{
                backgroundColor: "var(--accent-light)",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <i className="fa-solid fa-droplet" style={{ fontSize: "1.5rem", color: "var(--accent)" }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--accent)" }}>9.2M Lít</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Nước sạch được tiết kiệm</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{
                backgroundColor: "var(--sentiment-pos-light)",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <i className="fa-solid fa-shirt" style={{ fontSize: "1.5rem", color: "var(--sentiment-pos)" }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--sentiment-pos)" }}>18,450+</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Sản phẩm tái chế bán ra</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY / THREE PILLARS */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem auto" }}>
            <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Tầm Nhìn Bền Vững</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>
              Sứ mệnh giải cứu thời trang và Trái Đất
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6" }}>
              Khác với thời trang nhanh tàn phá môi trường, ReFashion thúc đẩy lối sống tiêu dùng thông minh dựa trên 3 nền tảng cốt lõi:
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}>
            
            {/* Pillar 1 */}
            <div style={{
              padding: "2.5rem",
              borderRadius: "20px",
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              textAlign: "center"
            }}>
              <i className="fa-solid fa-brain" style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "1.5rem" }}></i>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "700", marginBottom: "1rem" }}>Phân Tích Cảm Xúc AI</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                AI tự động phân tích đánh giá của người mua để tạo ra chỉ số "Độ Xanh" và "Độ Bền" thực tế, giúp bạn chọn sản phẩm chất lượng nhất.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{
              padding: "2.5rem",
              borderRadius: "20px",
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              textAlign: "center"
            }}>
              <i className="fa-solid fa-recycle" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.5rem" }}></i>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "700", marginBottom: "1rem" }}>Tái Sinh Quần Áo Cũ</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                Quyên góp quần áo cũ đã qua sử dụng của bạn. ReFashion chịu trách nhiệm phân loại, tái sinh sợi vải hoặc tái chế thành các sản phẩm mới.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{
              padding: "2.5rem",
              borderRadius: "20px",
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              textAlign: "center"
            }}>
              <i className="fa-solid fa-leaf" style={{ fontSize: "2.5rem", color: "var(--sentiment-pos)", marginBottom: "1.5rem" }}></i>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "700", marginBottom: "1rem" }}>Tích Lũy GreenCoin</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                Mỗi giao dịch xanh hoặc bài review chất lượng sẽ mang lại GreenCoin. Dùng coin để giảm giá đơn hàng hoặc đóng góp vào quỹ trồng rừng phi lợi nhuận.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem"
          }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Sản phẩm mới</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>
                Bộ Sưu Tập Thân Thiện Môi Trường
              </h2>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ display: "inline-flex", gap: "0.5rem" }}>
              Xem toàn bộ <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}>
            {featuredProducts.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER (PATAGONIA ACTIVISM STYLE) */}
      <section style={{
        padding: "6rem 0",
        backgroundColor: "var(--primary)",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          zIndex: 0
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", marginBottom: "1.5rem" }}>
            "Thời trang là tạm thời. Trái Đất là vĩnh cửu."
          </h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, lineHeight: "1.6", marginBottom: "2.5rem" }}>
            Đóng góp những bộ quần áo không còn dùng của bạn cho ReFashion để chúng ta cùng giảm thiểu lượng rác thải dệt may ra bãi chôn lấp. Nhận ngay điểm thưởng GreenCoin để tiếp tục mua sắm bền vững.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/community" className="btn btn-accent" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Quyên Góp Ngay
            </Link>
            <a href="#" className="btn btn-outline" style={{ padding: "0.85rem 2rem", fontSize: "1rem", color: "white", borderColor: "white" }}>
              Quy Trình Xử Lý Sợi Tái Chế
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
