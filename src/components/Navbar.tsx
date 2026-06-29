"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, getCartCount } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/cart");
    } else {
      router.push("/cart");
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push("/");
  };

  const cartCount = getCartCount();

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
            <li>
              <Link 
                href="/about" 
                className="nav-link-item"
                style={isActive("/about") ? { color: "var(--primary)", fontWeight: "600" } : {}}
              >
                Về ReFashion
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

          {/* Cart Icon */}
          <a
            href="/cart"
            onClick={handleCartClick}
            style={{ position: "relative", padding: "0.5rem", cursor: "pointer" }}
            aria-label="Cart"
          >
            <i className="fa-solid fa-bag-shopping" style={{ fontSize: "1.2rem", color: "var(--foreground)" }}></i>
            {cartCount > 0 && (
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
                {cartCount}
              </span>
            )}
          </a>

          {/* AUTH SECTION */}
          {isLoggedIn && user ? (
            /* LOGGED IN: Profile Avatar Dropdown */
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="profile-avatar-btn"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: user.photoUrl ? "transparent" : "linear-gradient(135deg, var(--primary), var(--accent))",
                  color: "white",
                  border: "2px solid transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  transition: "all 0.2s ease",
                  boxShadow: profileOpen ? "0 0 0 3px var(--primary-light)" : "none",
                  padding: 0,
                  overflow: "hidden"
                }}
                aria-label="Profile menu"
              >
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.username}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </button>

              {/* DROPDOWN MENU */}
              {profileOpen && (
                <div className="profile-dropdown animate-fade-in-up" style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  width: "320px",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  boxShadow: "0 20px 50px var(--shadow-lg)",
                  zIndex: 1000,
                  overflow: "hidden",
                  animation: "fadeInUp 0.2s ease"
                }}>
                  {/* User Info Header */}
                  <div style={{
                    padding: "1.5rem",
                    background: "linear-gradient(135deg, var(--primary), hsl(142, 55%, 30%))",
                    color: "white"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        fontSize: "1.25rem",
                        flexShrink: 0,
                        overflow: "hidden"
                      }}>
                        {user.photoUrl ? (
                          <img src={user.photoUrl} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                        ) : (
                          user.username.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <h4 style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "0.15rem" }}>
                          {user.username}
                        </h4>
                        <p style={{ fontSize: "0.8rem", opacity: 0.85, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* GreenCoin badge */}
                    <div style={{
                      marginTop: "1rem",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      padding: "0.6rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backdropFilter: "blur(4px)"
                    }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                        <i className="fa-solid fa-leaf" style={{ marginRight: "0.35rem" }}></i>
                        GreenCoin
                      </span>
                      <span style={{ fontSize: "1.15rem", fontWeight: "900" }}>
                        {user.greenCoin}
                      </span>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div style={{ padding: "0.5rem" }}>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="dropdown-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "var(--foreground)",
                        transition: "background 0.15s ease"
                      }}
                    >
                      <i className="fa-solid fa-user" style={{ width: "20px", textAlign: "center", color: "var(--primary)" }}></i>
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      href="/profile#orders"
                      onClick={() => setProfileOpen(false)}
                      className="dropdown-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "var(--foreground)",
                        transition: "background 0.15s ease"
                      }}
                    >
                      <i className="fa-solid fa-clock-rotate-left" style={{ width: "20px", textAlign: "center", color: "var(--accent)" }}></i>
                      Lịch sử đơn hàng
                    </Link>
                    <Link
                      href="/community"
                      onClick={() => setProfileOpen(false)}
                      className="dropdown-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "var(--foreground)",
                        transition: "background 0.15s ease"
                      }}
                    >
                      <i className="fa-solid fa-leaf" style={{ width: "20px", textAlign: "center", color: "var(--sentiment-pos)" }}></i>
                      GreenCoin & Đổi quà
                    </Link>

                    <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "0.35rem 0.5rem" }} />

                    <button
                      onClick={handleLogout}
                      className="dropdown-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "var(--sentiment-neg)",
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "var(--font-sans)",
                        transition: "background 0.15s ease"
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket" style={{ width: "20px", textAlign: "center" }}></i>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* NOT LOGGED IN: Login / Register buttons */
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/auth/login" className="btn btn-outline" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
                Đăng Nhập
              </Link>
              <Link href="/auth/register" className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
                Đăng Ký
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
