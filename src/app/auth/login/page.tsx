"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đăng nhập thành công với tài khoản: ${email}`);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 70px)",
      padding: "2rem",
      backgroundColor: "var(--background)"
    }}>
      
      <div style={{
        width: "1000px",
        maxWidth: "100%",
        height: "650px",
        backgroundColor: "var(--card)",
        borderRadius: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 50px var(--shadow-lg)"
      }}>
        
        {/* LEFT COLUMN: FORM */}
        <div style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <Link href="/" className="logo-brand" style={{ marginBottom: "2rem" }}>
            ReFashion
            <span>Eco</span>
          </Link>

          <h2 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", color: "var(--primary)", marginBottom: "0.5rem" }}>
            Chào mừng trở lại!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Tiếp tục hành trình mua sắm thời trang xanh cùng chúng tôi.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <input 
                type="email" 
                placeholder="Địa chỉ Email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem", position: "relative" }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Mật khẩu" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.95rem"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: 0,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}>
                <input type="checkbox" style={{ accentColor: "var(--primary)" }} /> Ghi nhớ đăng nhập
              </label>
              <a href="#" style={{ color: "var(--accent)", fontWeight: "600" }}>Quên mật khẩu?</a>
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: "100%", padding: "0.85rem", borderRadius: "12px", fontSize: "1rem" }}>
              Đăng Nhập
            </button>
          </form>

          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "1.5rem 0",
            fontSize: "0.8rem",
            color: "var(--text-muted)"
          }}>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
            <span style={{ padding: "0 0.75rem" }}>hoặc đăng nhập bằng</span>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <button className="btn btn-outline" style={{ padding: "0.6rem", borderRadius: "10px", fontSize: "0.85rem" }}>
              <i className="fa-brands fa-google" style={{ color: "var(--accent)" }}></i> Google
            </button>
            <button className="btn btn-outline" style={{ padding: "0.6rem", borderRadius: "10px", fontSize: "0.85rem" }}>
              <i className="fa-brands fa-apple"></i> Apple
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Bạn chưa có tài khoản?{" "}
            <Link href="/auth/register" style={{ color: "var(--primary)", fontWeight: "700" }}>
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* RIGHT COLUMN: BACKGROUND */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "3rem",
          color: "white"
        }}>
          {/* Background image */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to top, rgba(15, 81, 50, 0.9) 20%, rgba(15, 81, 50, 0.3) 100%), url('https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0
          }} />

          {/* Text content over overlay */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Tiêu dùng xanh</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", marginBottom: "0.75rem", lineHeight: "1.3" }}>
              Cấp Cho Quần Áo Cũ Vòng Đời Thứ Hai
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Quyên góp, trao đổi và phục sinh các trang phục dệt may cũ để cùng nhau giảm tải rác thải chôn lấp, làm sạch nguồn sống hành tinh.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
