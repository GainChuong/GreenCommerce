"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không trùng khớp!");
      return;
    }
    alert(`Đăng ký tài khoản thành công cho: ${username}`);
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
        height: "680px",
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
          <Link href="/" className="logo-brand" style={{ marginBottom: "1.5rem" }}>
            ReFashion
            <span>Eco</span>
          </Link>

          <h2 style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", color: "var(--primary)", marginBottom: "0.25rem" }}>
            Bắt đầu hành trình!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Đăng ký để trở thành một phần của cộng đồng thời trang bền vững.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <input 
                type="text" 
                placeholder="Tên đăng nhập" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem"
                }}
              />
              <input 
                type="email" 
                placeholder="Địa chỉ Email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <input 
                type="tel" 
                placeholder="Số điện thoại" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <input 
                type="password" 
                placeholder="Mật khẩu" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem"
                }}
              />
              <input 
                type="password" 
                placeholder="Nhập lại mật khẩu" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", fontSize: "0.95rem" }}>
              Đăng Ký Tài Khoản
            </button>
          </form>

          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "1rem 0",
            fontSize: "0.75rem",
            color: "var(--text-muted)"
          }}>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
            <span style={{ padding: "0 0.5rem" }}>hoặc đăng ký bằng</span>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <button className="btn btn-outline" style={{ padding: "0.5rem", borderRadius: "8px", fontSize: "0.8rem" }}>
              <i className="fa-brands fa-google" style={{ color: "var(--accent)" }}></i> Google
            </button>
            <button className="btn btn-outline" style={{ padding: "0.5rem", borderRadius: "8px", fontSize: "0.8rem" }}>
              <i className="fa-brands fa-apple"></i> Apple
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Bạn đã có tài khoản rồi?{" "}
            <Link href="/auth/login" style={{ color: "var(--primary)", fontWeight: "700" }}>
              Đăng nhập
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
            <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Tham gia với chúng tôi</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", marginBottom: "0.75rem", lineHeight: "1.3" }}>
              Tích Lũy GreenCoin Khi Mua Sắm Xanh
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Nhận ngay 100 GreenCoin miễn phí khi đăng ký tài khoản thành công hôm nay để bắt đầu tham gia các hoạt động trồng rừng bảo vệ Trái Đất.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
