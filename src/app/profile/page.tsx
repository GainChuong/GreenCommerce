"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, orders, donations, getCartCount } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Đang chuyển hướng...</p>
      </div>
    );
  }

  // Calculate stats
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCoinEarned = orders.reduce((sum, o) => sum + o.greenCoinEarned, 0) +
    donations.reduce((sum, d) => sum + d.coinEarned, 0);
  const totalDonatedItems = donations.reduce((sum, d) => sum + d.quantity, 0);
  const estimatedCO2 = (totalSpent / 1000000 * 2.5 + totalDonatedItems * 0.3).toFixed(1);

  return (
    <div style={{ padding: "3rem 0", backgroundColor: "var(--background)" }}>
      <div className="container">

        {/* PROFILE HERO CARD */}
        <div style={{
          background: "linear-gradient(135deg, var(--primary), hsl(142, 55%, 30%), hsl(160, 50%, 25%))",
          borderRadius: "28px",
          padding: "3rem",
          color: "white",
          marginBottom: "3rem",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(15, 81, 50, 0.3)"
        }}>
          {/* Background decoration */}
          <div style={{
            position: "absolute",
            right: "-40px",
            top: "-40px",
            fontSize: "14rem",
            opacity: 0.06,
            pointerEvents: "none"
          }}>
            <i className="fa-solid fa-leaf"></i>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", position: "relative", zIndex: 1 }}>
            {/* Avatar */}
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "2.75rem",
              border: "3px solid rgba(255,255,255,0.3)",
              flexShrink: 0,
              backdropFilter: "blur(8px)"
            }}>
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.25rem",
                fontWeight: "700",
                marginBottom: "0.5rem"
              }}>
                {user.username}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem", opacity: 0.9 }}>
                <span><i className="fa-solid fa-envelope" style={{ marginRight: "0.4rem" }}></i>{user.email}</span>
                <span><i className="fa-solid fa-phone" style={{ marginRight: "0.4rem" }}></i>{user.phone || "Chưa cập nhật"}</span>
                <span><i className="fa-solid fa-calendar" style={{ marginRight: "0.4rem" }}></i>Tham gia: {user.joinDate}</span>
              </div>
            </div>

            {/* GreenCoin Badge */}
            <div style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "1.25rem 2rem",
              textAlign: "center",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)"
            }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600", marginBottom: "0.35rem", color: "var(--accent)" }}>
                GreenCoin
              </p>
              <p style={{ fontSize: "2.5rem", fontWeight: "900", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {user.greenCoin} <i className="fa-solid fa-leaf" style={{ fontSize: "1.75rem", color: "var(--accent)" }}></i>
              </p>
            </div>
          </div>
        </div>

        {/* STATS DASHBOARD */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          {[
            { icon: "fa-bag-shopping", label: "Đơn hàng", value: orders.length.toString(), color: "var(--primary)", bg: "var(--primary-light)" },
            { icon: "fa-cart-shopping", label: "Trong giỏ", value: getCartCount().toString(), color: "var(--accent)", bg: "var(--accent-light)" },
            { icon: "fa-hand-holding-heart", label: "Đồ đã quyên góp", value: `${totalDonatedItems} món`, color: "var(--sentiment-pos)", bg: "var(--sentiment-pos-light)" },
            { icon: "fa-cloud-arrow-down", label: "CO₂ đã giảm", value: `${estimatedCO2} kg`, color: "var(--primary)", bg: "var(--primary-light)" },
            { icon: "fa-coins", label: "Tổng coin kiếm được", value: totalCoinEarned.toString(), color: "var(--accent)", bg: "var(--accent-light)" },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: "var(--card)",
              borderRadius: "20px",
              padding: "1.5rem",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "0 4px 15px var(--shadow)"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <i className={`fa-solid ${stat.icon}`} style={{ fontSize: "1.2rem", color: stat.color }}></i>
              </div>
              <div>
                <p style={{ fontSize: "1.5rem", fontWeight: "800", color: stat.color }}>{stat.value}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER HISTORY */}
        <div id="orders" style={{
          backgroundColor: "var(--card)",
          borderRadius: "24px",
          border: "1px solid var(--border)",
          padding: "2.5rem",
          marginBottom: "3rem",
          boxShadow: "0 10px 30px var(--shadow)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>Lịch sử mua hàng</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--primary)" }}>
                Đơn Hàng Của Bạn
              </h2>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ borderRadius: "12px", fontSize: "0.85rem" }}>
              <i className="fa-solid fa-bag-shopping"></i> Tiếp tục mua sắm
            </Link>
          </div>

          {orders.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {orders.map((order) => (
                <div key={order.id} style={{
                  backgroundColor: "var(--background)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  padding: "1.5rem",
                  transition: "all 0.2s ease"
                }}>
                  {/* Order header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: "800", fontSize: "0.95rem", color: "var(--primary)" }}>
                        #{order.id}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        <i className="fa-solid fa-calendar" style={{ marginRight: "0.3rem" }}></i>{order.date}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <span className="badge" style={{
                        backgroundColor: order.status === "delivered" ? "var(--sentiment-pos-light)" :
                          order.status === "shipped" ? "var(--accent-light)" : "var(--sentiment-neu-light)",
                        color: order.status === "delivered" ? "var(--sentiment-pos)" :
                          order.status === "shipped" ? "var(--accent)" : "var(--sentiment-neu)",
                        textTransform: "none",
                        fontSize: "0.75rem"
                      }}>
                        {order.status === "processing" ? "⏳ Đang xử lý" :
                          order.status === "shipped" ? "🚚 Đang giao" : "✅ Đã giao"}
                      </span>
                      <span style={{
                        fontWeight: "800",
                        fontSize: "1.05rem",
                        color: "var(--accent)"
                      }}>
                        {order.totalStr}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        backgroundColor: "var(--card)",
                        padding: "0.6rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid var(--border)"
                      }}>
                        <img src={item.image} alt={item.name} style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          objectFit: "cover"
                        }} />
                        <div>
                          <p style={{ fontSize: "0.8rem", fontWeight: "600", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            x{item.quantity} • {item.priceStr}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* GreenCoin earned */}
                  <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--sentiment-pos)" }}>
                    <i className="fa-solid fa-leaf"></i>
                    <span>+{order.greenCoinEarned} GreenCoin được cộng từ đơn hàng này</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "var(--text-muted)"
            }}>
              <i className="fa-solid fa-receipt" style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}></i>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.5rem", color: "var(--foreground)" }}>
                Chưa có đơn hàng nào
              </h3>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Hãy bắt đầu mua sắm xanh để tạo đơn hàng đầu tiên nhé!
              </p>
              <Link href="/shop" className="btn btn-primary" style={{ borderRadius: "12px" }}>
                Khám phá Cửa Hàng
              </Link>
            </div>
          )}
        </div>

        {/* DONATION HISTORY */}
        <div style={{
          backgroundColor: "var(--card)",
          borderRadius: "24px",
          border: "1px solid var(--border)",
          padding: "2.5rem",
          boxShadow: "0 10px 30px var(--shadow)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>Hoạt động xanh</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--primary)" }}>
                Lịch Sử Quyên Góp
              </h2>
            </div>
            <Link href="/community" className="btn btn-outline" style={{ borderRadius: "12px", fontSize: "0.85rem" }}>
              <i className="fa-solid fa-hand-holding-heart"></i> Quyên góp thêm
            </Link>
          </div>

          {donations.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {donations.map((d) => (
                <div key={d.id} style={{
                  backgroundColor: "var(--background)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  padding: "1.25rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--primary)" }}>#{d.id}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.date}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                    {d.clothingType === "shirt" ? "Áo Thun / Áo Sơ Mi" :
                      d.clothingType === "jacket" ? "Áo Khoác" :
                        d.clothingType === "pants" ? "Quần Jean / Kaki" :
                          d.clothingType === "dress" ? "Váy / Đầm" : "Khác"}
                    {" "}— {d.quantity} món
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    Tình trạng: {d.condition === "new" ? "Còn rất mới" : d.condition === "good" ? "Còn tốt" : "Hơi cũ"}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.8rem",
                    color: "var(--sentiment-pos)",
                    fontWeight: "700"
                  }}>
                    <i className="fa-solid fa-leaf"></i>
                    +{d.coinEarned} GreenCoin
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "var(--text-muted)"
            }}>
              <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}></i>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.5rem", color: "var(--foreground)" }}>
                Chưa có lượt quyên góp nào
              </h3>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Hãy quyên góp quần áo cũ để nhận GreenCoin và bảo vệ môi trường!
              </p>
              <Link href="/community" className="btn btn-accent" style={{ borderRadius: "12px" }}>
                Quyên Góp Ngay
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
