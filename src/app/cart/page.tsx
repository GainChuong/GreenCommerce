"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const router = useRouter();
  const { user, isLoggedIn, cart, updateCartQuantity, removeFromCart, getCartTotal } = useAuth();
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/cart");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Đang chuyển hướng...</p>
      </div>
    );
  }

  const cartTotal = getCartTotal();
  const greenCoinEstimate = Math.floor(cartTotal / 100000) * 5;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div style={{ padding: "3rem 0", backgroundColor: "var(--background)" }}>
      <div className="container">

        {/* NOTIFICATION TOAST */}
        {notification && (
          <div style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "hsl(210, 15%, 15%)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "12px",
            boxShadow: "0 10px 30px var(--shadow-lg)",
            zIndex: 9999,
            fontWeight: "600",
            animation: "fadeInUp 0.3s ease"
          }}>
            {notification}
          </div>
        )}

        {/* HEADER */}
        <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
          <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Giỏ Hàng Xanh</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
            Giỏ Hàng Của Bạn
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Kiểm tra lại các sản phẩm thân thiện môi trường trước khi đặt hàng.
          </p>
        </div>

        {cart.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "3rem",
            alignItems: "start"
          }}>
            {/* CART ITEMS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {cart.map((item) => (
                <div key={item.productId} style={{
                  backgroundColor: "var(--card)",
                  borderRadius: "20px",
                  border: "1px solid var(--border)",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  boxShadow: "0 4px 15px var(--shadow)",
                  transition: "all 0.2s ease"
                }} className="card-hover">
                  {/* Product Image */}
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "1px solid var(--border)"
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                      <div>
                        <span className="badge badge-primary" style={{ fontSize: "0.65rem", marginBottom: "0.35rem" }}>
                          Eco-Score: {item.ecoScore}
                        </span>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--foreground)" }}>
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.productId);
                          showToast("🗑️ Đã xóa sản phẩm khỏi giỏ hàng");
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          fontSize: "1rem",
                          padding: "0.25rem",
                          borderRadius: "8px",
                          transition: "color 0.2s"
                        }}
                        title="Xóa sản phẩm"
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sentiment-neg)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>

                    <p style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--primary)", marginBottom: "0.75rem" }}>
                      {item.priceStr}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>Số lượng:</span>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "12px",
                        border: "1px solid var(--border)",
                        overflow: "hidden"
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            border: "none",
                            backgroundColor: "var(--background)",
                            cursor: "pointer",
                            fontSize: "1rem",
                            color: "var(--foreground)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-light)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--background)")}
                        >
                          <i className="fa-solid fa-minus" style={{ fontSize: "0.7rem" }}></i>
                        </button>
                        <span style={{
                          width: "40px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "0.95rem",
                          backgroundColor: "var(--card)"
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            border: "none",
                            backgroundColor: "var(--background)",
                            cursor: "pointer",
                            fontSize: "1rem",
                            color: "var(--foreground)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-light)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--background)")}
                        >
                          <i className="fa-solid fa-plus" style={{ fontSize: "0.7rem" }}></i>
                        </button>
                      </div>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        = <strong style={{ color: "var(--accent)" }}>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={{
              position: "sticky",
              top: "90px",
              backgroundColor: "var(--card)",
              borderRadius: "24px",
              border: "1px solid var(--border)",
              padding: "2rem",
              boxShadow: "0 10px 30px var(--shadow)"
            }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--primary)", marginBottom: "1.5rem" }}>
                Tóm Tắt Đơn Hàng
              </h3>

              {/* Items summary */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {cart.map((item) => (
                  <div key={item.productId} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)"
                  }}>
                    <span style={{ maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name} x{item.quantity}
                    </span>
                    <span style={{ fontWeight: "600", color: "var(--foreground)" }}>
                      {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                ))}
              </div>

              <hr style={{ border: "0", borderTop: "1px solid var(--border)", marginBottom: "1.5rem" }} />

              {/* Subtotals */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Tạm tính</span>
                  <span style={{ fontWeight: "600" }}>{cartTotal.toLocaleString("vi-VN")} đ</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Phí vận chuyển</span>
                  <span style={{ fontWeight: "600", color: "var(--sentiment-pos)" }}>Miễn phí</span>
                </div>
              </div>

              <hr style={{ border: "0", borderTop: "2px solid var(--primary)", marginBottom: "1.25rem" }} />

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.15rem", fontWeight: "700" }}>Tổng cộng</span>
                <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "var(--accent)" }}>
                  {cartTotal.toLocaleString("vi-VN")} đ
                </span>
              </div>

              {/* GreenCoin reward estimate */}
              <div style={{
                backgroundColor: "var(--sentiment-pos-light)",
                borderRadius: "12px",
                padding: "0.85rem 1rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "var(--sentiment-pos)"
              }}>
                <i className="fa-solid fa-leaf"></i>
                Bạn sẽ nhận được +{greenCoinEstimate} GreenCoin sau khi đặt hàng!
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push("/checkout")}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "14px",
                  fontSize: "1.05rem",
                  fontWeight: "700"
                }}
              >
                <i className="fa-solid fa-lock" style={{ marginRight: "0.35rem" }}></i>
                Tiến Hành Thanh Toán
              </button>

              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: "0.25rem" }}></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>
        ) : (
          /* EMPTY CART */
          <div style={{
            textAlign: "center",
            padding: "6rem 2rem",
            backgroundColor: "var(--card)",
            borderRadius: "28px",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 30px var(--shadow)"
          }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem auto"
            }}>
              <i className="fa-solid fa-bag-shopping" style={{ fontSize: "2.5rem", color: "var(--primary)", opacity: 0.5 }}></i>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", marginBottom: "0.75rem", color: "var(--foreground)" }}>
              Giỏ hàng trống
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem auto", lineHeight: 1.6 }}>
              Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá bộ sưu tập thời trang xanh của chúng tôi!
            </p>
            <Link href="/shop" className="btn btn-primary" style={{
              padding: "1rem 2.5rem",
              borderRadius: "14px",
              fontSize: "1rem"
            }}>
              <i className="fa-solid fa-bag-shopping" style={{ marginRight: "0.4rem" }}></i>
              Khám Phá Cửa Hàng
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
