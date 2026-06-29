import React from "react";
import Link from "next/link";

const TIMELINE = [
  {
    year: "2019",
    title: "Ý tưởng nảy sinh",
    desc: "Hai sinh viên đại học nhận ra rằng ngành thời trang là một trong những ngành gây ô nhiễm lớn thứ hai thế giới. Từ một đề án nghiên cứu nhỏ, ReFashion bắt đầu hình thành.",
    icon: "fa-lightbulb",
    color: "var(--accent)"
  },
  {
    year: "2020",
    title: "Thành lập chính thức",
    desc: "ReFashion ra mắt tại TP.HCM với 5 thành viên sáng lập và mô hình thu gom, tái sinh sợi vải từ quần áo cũ đầu tiên tại Việt Nam.",
    icon: "fa-seedling",
    color: "var(--primary)"
  },
  {
    year: "2021",
    title: "Ra mắt nền tảng AI",
    desc: "Hệ thống phân tích cảm xúc AI đầu tiên được tích hợp, giúp người mua hiểu rõ hơn về chất lượng thực sự của từng sản phẩm thân thiện môi trường.",
    icon: "fa-brain",
    color: "var(--sentiment-pos)"
  },
  {
    year: "2022",
    title: "Chương trình GreenCoin",
    desc: "Ra mắt hệ sinh thái điểm thưởng GreenCoin — biến mỗi hành động xanh thành phần thưởng hữu hình, khuyến khích cộng đồng sống bền vững hơn.",
    icon: "fa-leaf",
    color: "var(--primary)"
  },
  {
    year: "2023",
    title: "Mở rộng toàn quốc",
    desc: "ReFashion hiện diện tại 12 tỉnh thành với 30+ điểm thu gom. Hơn 18.000 sản phẩm tái chế đã được bán ra, cắt giảm 15 tấn CO₂ mỗi năm.",
    icon: "fa-earth-asia",
    color: "var(--accent)"
  }
];

const TEAM = [
  {
    name: "Nguyễn Minh Anh",
    role: "Đồng sáng lập & CEO",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    quote: "\"Thời trang không nên có giá phải trả bằng tương lai của hành tinh.\""
  },
  {
    name: "Trần Hữu Đức",
    role: "Đồng sáng lập & CTO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    quote: "\"AI không chỉ để làm kinh tế — chúng tôi dùng nó để bảo vệ trái đất.\""
  },
  {
    name: "Lê Thu Hà",
    role: "Giám đốc Cộng đồng",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    quote: "\"Mỗi người trong cộng đồng đều là một chiến sĩ môi trường.\""
  }
];

const CERTIFICATIONS = [
  { name: "GOTS Certified", desc: "Tiêu chuẩn dệt may hữu cơ toàn cầu", icon: "fa-certificate" },
  { name: "B Corp Pending", desc: "Đang trong quá trình chứng nhận doanh nghiệp vì lợi ích cộng đồng", icon: "fa-award" },
  { name: "ISO 14001", desc: "Hệ thống quản lý môi trường quốc tế", icon: "fa-shield-halved" },
  { name: "1% for the Planet", desc: "Đóng góp 1% doanh thu cho các dự án môi trường", icon: "fa-earth-asia" }
];

export default function About() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

      {/* HERO */}
      <section style={{
        position: "relative",
        padding: "8rem 0 6rem",
        overflow: "hidden",
        backgroundColor: "var(--primary)"
      }}>
        {/* Background */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1920')",
          backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, zIndex: 0
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
          <span className="badge badge-accent" style={{ marginBottom: "1.5rem" }}>Câu Chuyện Của Chúng Tôi</span>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.15,
            fontWeight: 700,
            marginBottom: "1.5rem"
          }}>
            Về ReFashion
          </h1>
          <p style={{
            fontSize: "1.2rem", lineHeight: 1.7, opacity: 0.9,
            maxWidth: "640px", margin: "0 auto 2.5rem"
          }}>
            Chúng tôi không chỉ bán quần áo — chúng tôi đang xây dựng lại mối quan hệ giữa con người, thời trang và hành tinh.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn btn-accent" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Khám phá cửa hàng xanh
            </Link>
            <Link href="/community" className="btn btn-outline" style={{ padding: "0.85rem 2rem", fontSize: "1rem", color: "white", borderColor: "white" }}>
              Tham gia cộng đồng
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Tác Động Thực Tế</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>
              Con số không biết nói dối
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { value: "15.4 Tấn", label: "CO₂ cắt giảm mỗi năm", icon: "fa-cloud-arrow-down", color: "var(--primary)" },
              { value: "9.2M Lít", label: "Nước sạch tiết kiệm", icon: "fa-droplet", color: "var(--accent)" },
              { value: "18,450+", label: "Sản phẩm tái chế bán ra", icon: "fa-shirt", color: "var(--sentiment-pos)" },
              { value: "5,200+", label: "Thành viên cộng đồng xanh", icon: "fa-users", color: "var(--primary)" }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: "2rem",
                borderRadius: "20px",
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                textAlign: "center",
                boxShadow: "0 4px 20px var(--shadow)"
              }}>
                <i className={`fa-solid ${stat.icon}`} style={{ fontSize: "2rem", color: stat.color, marginBottom: "1rem" }}></i>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, marginBottom: "0.35rem" }}>{stat.value}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "3rem",
            alignItems: "center"
          }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Sứ Mệnh</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                Tái định nghĩa thời trang với trách nhiệm
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                ReFashion tin rằng mỗi chiếc áo, mỗi chiếc quần đều có thể có một vòng đời thứ hai — hoặc thứ ba. Thay vì để chúng kết thúc ở bãi rác, chúng tôi tạo ra hệ sinh thái tuần hoàn giúp sợi vải trở thành sợi vải mới.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.75 }}>
                Với công nghệ AI phân tích cảm xúc, chúng tôi giúp người tiêu dùng đưa ra lựa chọn thông minh hơn — mua ít hơn, mua tốt hơn, và mua có ý nghĩa hơn.
              </p>
            </div>
            <div style={{
              borderRadius: "24px",
              overflow: "hidden",
              height: "400px",
              boxShadow: "0 20px 50px var(--shadow-lg)"
            }}>
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800"
                alt="Rừng xanh — tầm nhìn của ReFashion"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Hành Trình</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>
              Từ ý tưởng đến phong trào
            </h2>
          </div>

          <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "100%",
              backgroundColor: "var(--border)",
              top: 0
            }} />

            {TIMELINE.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                marginBottom: "3rem",
                position: "relative"
              }}>
                {/* Center dot */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "1.5rem",
                  transform: "translateX(-50%)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.1rem",
                  boxShadow: `0 0 0 4px white, 0 0 0 6px ${item.color}33`,
                  zIndex: 2
                }}>
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>

                {/* Card */}
                <div style={{
                  width: "44%",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 20px var(--shadow)"
                }}>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: item.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>{item.year}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.35rem 0 0.5rem", color: "var(--foreground)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Đội Ngũ Sáng Lập</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>
              Những người tin vào thay đổi
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem"
          }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{
                backgroundColor: "var(--card)",
                borderRadius: "24px",
                border: "1px solid var(--border)",
                padding: "2.5rem",
                textAlign: "center",
                boxShadow: "0 10px 30px var(--shadow)",
                transition: "all 0.3s ease"
              }} className="card-hover">
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 1.25rem",
                  border: "3px solid var(--primary)",
                  padding: "3px",
                  boxSizing: "border-box"
                }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {member.role}
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, fontStyle: "italic" }}>
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: "4rem 0", backgroundColor: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Chứng Nhận</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem" }}>
              Cam kết được công nhận
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem"
          }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "1.5rem",
                backgroundColor: "var(--background)",
                borderRadius: "16px",
                border: "1px solid var(--border)"
              }}>
                <div style={{
                  backgroundColor: "var(--primary-light)",
                  borderRadius: "12px",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <i className={`fa-solid ${cert.icon}`} style={{ color: "var(--primary)", fontSize: "1.1rem" }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.25rem" }}>{cert.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "6rem 0",
        backgroundColor: "var(--primary)",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200')",
          backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, zIndex: 0
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1.25rem" }}>
            Bạn cũng là một phần của câu chuyện này
          </h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Mỗi chiếc áo bạn quyên góp, mỗi sản phẩm xanh bạn chọn mua — đều là một trang viết thêm vào câu chuyện bảo vệ hành tinh của chúng ta.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/register" className="btn btn-accent" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Tham gia ngay — Miễn phí
            </Link>
            <Link href="/shop" className="btn btn-outline" style={{ padding: "0.85rem 2rem", fontSize: "1rem", color: "white", borderColor: "white" }}>
              Xem sản phẩm xanh
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
