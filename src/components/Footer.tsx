"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem"
        }}>
          
          {/* Column 1: Brand Philosophy */}
          <div>
            <h3 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "1.5rem", 
              marginBottom: "1rem",
              color: "white"
            }}>
              ReFashion <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--accent)" }}>ECO</span>
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "hsl(30, 10%, 75%)", marginBottom: "1.5rem" }}>
              Chúng tôi không chỉ bán quần áo xanh. Chúng tôi đồng hành cùng bạn trên con đường giảm thiểu rác thải thời trang, thúc đẩy tái chế và bảo vệ màu xanh của Trái Đất.
            </p>
            <div style={{ display: "flex", gap: "1rem", fontSize: "1.2rem" }}>
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Youtube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 style={{ color: "white", fontSize: "1rem", marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Mua Sắm & Tái Chế
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li><Link href="/shop">Tất cả sản phẩm xanh</Link></li>
              <li><Link href="/shop?eco=organic">Vải hữu cơ (Organic)</Link></li>
              <li><Link href="/shop?eco=recycled">Vật liệu tái chế</Link></li>
              <li><Link href="/community">Quyên góp quần áo cũ</Link></li>
              <li><Link href="/community">Quy trình xử lý rác thải</Link></li>
            </ul>
          </div>

          {/* Column 3: Activism */}
          <div>
            <h4 style={{ color: "white", fontSize: "1rem", marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Chiến Dịch Hành Tinh
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li><a href="#">Tuyên ngôn 1% cho Trái Đất</a></li>
              <li><a href="#">Hoạt động làm sạch bờ biển</a></li>
              <li><a href="#">Kết nối các tổ chức phi lợi nhuận</a></li>
              <li><a href="#">Theo dõi dấu chân carbon của bạn</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ color: "white", fontSize: "1rem", marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Đăng ký Bản tin Xanh
            </h4>
            <p style={{ fontSize: "0.85rem", color: "hsl(30, 10%, 75%)", marginBottom: "1rem", lineHeight: "1.5" }}>
              Nhận thông tin về các sản phẩm thân thiện với môi trường mới nhất và các hoạt động bảo vệ môi trường của chúng tôi.
            </p>
            <form style={{ display: "flex", gap: "0.5rem" }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                required
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "30px",
                  border: "1px solid hsl(210, 15%, 25%)",
                  backgroundColor: "hsl(210, 15%, 16%)",
                  color: "white",
                  fontSize: "0.85rem",
                  flexGrow: 1
                }}
              />
              <button className="btn btn-accent" type="submit" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                Đăng ký
              </button>
            </form>
          </div>

        </div>

        <hr style={{ border: "0", borderTop: "1px solid hsl(210, 15%, 20%)", marginBottom: "2rem" }} />

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "0.8rem",
          color: "hsl(30, 10%, 60%)"
        }}>
          <p>© {new Date().getFullYear()} ReFashion Eco Inc. Thiết kế lấy cảm hứng từ sứ mệnh bảo vệ Trái Đất của Patagonia.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
