"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`navbar-header glass ${scrolled ? "scrolled" : ""}`}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "70px" }}>
        
        {/* LOGO */}
        <Link href="/" className="logo-brand">
          ReFashion
          <span>Eco</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav>
          <ul className="nav-links-list">
            <li>
              <Link 
                href="/" 
                className="nav-link-item"
                style={isActive("/") ? { color: "var(--primary)", fontWeight: "600" } : {}}
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link 
                href="/shop" 
                className="nav-link-item"
                style={isActive("/shop") ? { color: "var(--primary)", fontWeight: "600" } : {}}
              >
                Cửa Hàng
              </Link>
            </li>
            <li>
              <Link 
                href="/community" 
                className="nav-link-item"
                style={isActive("/community") ? { color: "var(--primary)", fontWeight: "600" } : {}}
              >
                GreenCoin & Đổi Quà
              </Link>
            </li>
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions-div">
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm xanh..." 
              style={{
                padding: "0.5rem 1rem 0.5rem 2.25rem",
                borderRadius: "30px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.85rem",
                width: "200px",
                transition: "width 0.3s ease"
              }}
              onFocus={(e) => e.target.style.width = "260px"}
              onBlur={(e) => e.target.style.width = "200px"}
            />
            <i 
              className="fa-solid fa-magnifying-glass" 
              style={{ 
                position: "absolute", 
                left: "0.85rem", 
                color: "var(--text-muted)",
                fontSize: "0.85rem"
              }}
            ></i>
          </div>

          <Link href="/cart" style={{ position: "relative", padding: "0.5rem" }} aria-label="Cart">
            <i className="fa-solid fa-bag-shopping" style={{ fontSize: "1.2rem", color: "var(--foreground)" }}></i>
            <span style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              backgroundColor: "var(--accent)",
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "700",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              2
            </span>
          </Link>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href="/auth/login" className="btn btn-outline" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
              Đăng Nhập
            </Link>
            <Link href="/auth/register" className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
              Đăng Ký
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
