"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, CartItem } from "@/context/AuthContext";

// Product DB for "Buy Now" lookup
const BUYNOW_PRODUCTS: Record<string, { name: string; price: number; priceStr: string; image: string; ecoScore: string }> = {
  "1": { name: "Áo Khoác Gió Recycled Ocean-Plastic", price: 1250000, priceStr: "1,250,000 đ", image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400", ecoScore: "A+" },
  "2": { name: "Balo Leo Núi Eco-Trail 30L", price: 1890000, priceStr: "1,890,000 đ", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400", ecoScore: "A" },
  "3": { name: "Áo Thun Polo Organic Cotton", price: 450000, priceStr: "450,000 đ", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400", ecoScore: "A+" },
};

const PROVINCES = [
  "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng",
  "Bình Dương", "Đồng Nai", "Long An", "Bà Rịa – Vũng Tàu", "Bắc Ninh",
  "Khánh Hòa", "Lâm Đồng", "Nghệ An", "Thừa Thiên Huế", "Quảng Ninh"
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, cart, placeOrderWithDetails, applyVoucher } = useAuth();

  const buyNowId = searchParams.get("buyNow");

  // Determine items for checkout
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (buyNowId && BUYNOW_PRODUCTS[buyNowId]) {
      const p = BUYNOW_PRODUCTS[buyNowId];
      setCheckoutItems([{
        productId: buyNowId,
        name: p.name,
        price: p.price,
        priceStr: p.priceStr,
        image: p.image,
        quantity: 1,
        ecoScore: p.ecoScore,
      }]);
    } else {
      setCheckoutItems([...cart]);
    }
  }, [isLoggedIn, buyNowId, cart, router]);

  // Form states
  const [fullName, setFullName] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [province, setProvince] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "momo">("cod");

  // Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; description: string } | null>(null);
  const [voucherError, setVoucherError] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [momoLoading, setMomoLoading] = useState(false);

  // Order success
  const [orderSuccess, setOrderSuccess] = useState<{ id: string; greenCoin: number; deliveryRange: string } | null>(null);

  // Calculate delivery dates
  const getDeliveryRange = () => {
    const now = new Date();
    const from = new Date(now);
    from.setDate(from.getDate() + 3);
    const to = new Date(now);
    to.setDate(to.getDate() + 5);
    const fmt = (d: Date) => d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    return `${fmt(from)} — ${fmt(to)}`;
  };

  // Totals
  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountPercent = appliedVoucher?.discount || 0;
  const discountAmount = Math.floor(subtotal * discountPercent / 100);
  const total = subtotal - discountAmount;
  const greenCoinEstimate = Math.floor(total / 100000) * 5;

  // Apply voucher
  const handleApplyVoucher = () => {
    setVoucherError("");
    if (!voucherCode.trim()) {
      setVoucherError("Vui lòng nhập mã voucher.");
      return;
    }
    const voucher = applyVoucher(voucherCode.trim());
    if (voucher) {
      setAppliedVoucher({ code: voucher.code, discount: voucher.discount, description: voucher.description });
      setVoucherError("");
    } else {
      setVoucherError("Mã voucher không hợp lệ, đã hết hạn hoặc đã được sử dụng.");
      setAppliedVoucher(null);
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherError("");
  };

  // Validate & submit
  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Vui lòng nhập họ tên.";
    if (!phone.trim() || phone.length < 9) errs.phone = "Số điện thoại không hợp lệ.";
    if (!province) errs.province = "Vui lòng chọn tỉnh/thành phố.";
    if (!addressDetail.trim()) errs.addressDetail = "Vui lòng nhập địa chỉ chi tiết.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const fullAddress = `${addressDetail}, ${province}`;

    // ===== MoMo Payment Flow =====
    if (paymentMethod === "momo") {
      setMomoLoading(true);
      try {
        const orderId = `RF-${Date.now().toString(36).toUpperCase()}`;
        const momoItems = checkoutItems.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          currency: "VND",
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        }));

        const res = await fetch("/api/momo/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            orderId,
            orderInfo: `ReFashion - ${checkoutItems.map(i => i.name).join(", ")}`,
            items: momoItems,
          }),
        });

        const data = await res.json();

        if (data.success && data.payUrl) {
          // Save order locally before redirecting
          placeOrderWithDetails({
            items: checkoutItems,
            discountPercent,
            voucherCode: appliedVoucher?.code,
            phone,
            address: fullAddress,
            note,
          });
          // Redirect to MoMo payment page in new tab
          window.open(data.payUrl, "_blank");
        } else {
          setErrors({ payment: data.error || "Không thể tạo thanh toán MoMo. Vui lòng thử lại." });
          setMomoLoading(false);
        }
      } catch {
        setErrors({ payment: "Lỗi kết nối. Vui lòng thử lại." });
        setMomoLoading(false);
      }
      return;
    }

    // ===== COD Payment Flow =====
    const order = placeOrderWithDetails({
      items: checkoutItems,
      discountPercent,
      voucherCode: appliedVoucher?.code,
      phone,
      address: fullAddress,
      note,
    });

    if (order) {
      setOrderSuccess({
        id: order.id,
        greenCoin: order.greenCoinEarned,
        deliveryRange: getDeliveryRange(),
      });
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Đang chuyển hướng...</p>
      </div>
    );
  }

  if (checkoutItems.length === 0 && !orderSuccess) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: "1rem" }}>
        <i className="fa-solid fa-bag-shopping" style={{ fontSize: "3rem", color: "var(--text-muted)", opacity: 0.3 }}></i>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Không có sản phẩm nào để thanh toán.</p>
        <Link href="/shop" className="btn btn-primary" style={{ borderRadius: "12px" }}>Quay lại Cửa Hàng</Link>
      </div>
    );
  }

  // SUCCESS VIEW
  if (orderSuccess) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 70px)", padding: "2rem" }}>
        <div className="animate-fade-in-up" style={{
          backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "28px",
          padding: "3.5rem", textAlign: "center", maxWidth: "600px", boxShadow: "0 20px 50px var(--shadow-lg)"
        }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "var(--sentiment-pos-light)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto"
          }}>
            <i className="fa-solid fa-check" style={{ fontSize: "2.5rem", color: "var(--sentiment-pos)" }}></i>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--primary)", marginBottom: "0.75rem" }}>
            Đặt Hàng Thành Công! 🎉
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
            Mã đơn hàng: <strong style={{ color: "var(--primary)" }}>#{orderSuccess.id}</strong>
          </p>

          <div style={{ backgroundColor: "var(--primary-light)", borderRadius: "16px", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", fontWeight: "700", color: "var(--primary)" }}>
              <i className="fa-solid fa-truck-fast"></i> Thời gian giao hàng dự kiến
            </div>
            <p style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--foreground)" }}>
              📦 {orderSuccess.deliveryRange}
            </p>
          </div>

          <div style={{
            backgroundColor: "var(--sentiment-pos-light)", borderRadius: "12px", padding: "1rem",
            marginBottom: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem",
            color: "var(--sentiment-pos)", fontWeight: "700", fontSize: "1rem"
          }}>
            <i className="fa-solid fa-leaf"></i>
            Bạn được cộng +{orderSuccess.greenCoin} GreenCoin!
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/profile#orders" className="btn btn-primary" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
              Xem Đơn Hàng
            </Link>
            <Link href="/shop" className="btn btn-outline" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div style={{ padding: "3rem 0", backgroundColor: "var(--background)" }}>
      <div className="container">

        {/* HEADER */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link href={buyNowId ? `/shop/${buyNowId}` : "/cart"} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            <i className="fa-solid fa-arrow-left"></i> {buyNowId ? "Quay lại sản phẩm" : "Quay lại giỏ hàng"}
          </Link>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--primary)" }}>
            Xác Nhận Đơn Hàng
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* LEFT: FORM */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* SHIPPING INFO */}
            <div style={{ backgroundColor: "var(--card)", borderRadius: "24px", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 15px var(--shadow)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-location-dot"></i> Thông Tin Giao Hàng
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Họ và Tên *</label>
                  <input
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: "" })); }}
                    placeholder="Nguyễn Văn A"
                    style={{
                      width: "100%", padding: "0.75rem 1rem", borderRadius: "12px",
                      border: `1px solid ${errors.fullName ? "#ef4444" : "var(--border)"}`,
                      backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem"
                    }}
                  />
                  {errors.fullName && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.fullName}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Số Điện Thoại *</label>
                  <input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: "" })); }}
                    placeholder="0912 345 678"
                    style={{
                      width: "100%", padding: "0.75rem 1rem", borderRadius: "12px",
                      border: `1px solid ${errors.phone ? "#ef4444" : "var(--border)"}`,
                      backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem"
                    }}
                  />
                  {errors.phone && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.phone}</p>}
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Tỉnh / Thành Phố *</label>
                <select
                  value={province}
                  onChange={(e) => { setProvince(e.target.value); setErrors(p => ({ ...p, province: "" })); }}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", borderRadius: "12px",
                    border: `1px solid ${errors.province ? "#ef4444" : "var(--border)"}`,
                    backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem"
                  }}
                >
                  <option value="">— Chọn tỉnh/thành phố —</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.province && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.province}</p>}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Địa Chỉ Chi Tiết *</label>
                <input
                  value={addressDetail}
                  onChange={(e) => { setAddressDetail(e.target.value); setErrors(p => ({ ...p, addressDetail: "" })); }}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                  style={{
                    width: "100%", padding: "0.75rem 1rem", borderRadius: "12px",
                    border: `1px solid ${errors.addressDetail ? "#ef4444" : "var(--border)"}`,
                    backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem"
                  }}
                />
                {errors.addressDetail && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.addressDetail}</p>}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Ghi Chú (Tùy chọn)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao ngoài giờ hành chính, gọi trước 30 phút..."
                  rows={3}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", borderRadius: "12px",
                    border: "1px solid var(--border)", backgroundColor: "var(--background)",
                    color: "var(--foreground)", fontSize: "0.95rem", resize: "vertical"
                  }}
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div style={{ backgroundColor: "var(--card)", borderRadius: "24px", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 4px 15px var(--shadow)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-credit-card"></i> Phương Thức Thanh Toán
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label
                  onClick={() => setPaymentMethod("cod")}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem",
                    borderRadius: "14px", cursor: "pointer", transition: "all 0.2s",
                    border: paymentMethod === "cod" ? "2px solid var(--primary)" : "1px solid var(--border)",
                    backgroundColor: paymentMethod === "cod" ? "var(--primary-light)" : "var(--background)"
                  }}
                >
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    border: paymentMethod === "cod" ? "6px solid var(--primary)" : "2px solid var(--border)",
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "0.95rem" }}>
                      <i className="fa-solid fa-money-bill-wave" style={{ marginRight: "0.35rem", color: "var(--sentiment-pos)" }}></i>
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("momo")}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem",
                    borderRadius: "14px", cursor: "pointer", transition: "all 0.2s",
                    border: paymentMethod === "momo" ? "2px solid #a50064" : "1px solid var(--border)",
                    backgroundColor: paymentMethod === "momo" ? "#fef0f8" : "var(--background)"
                  }}
                >
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    border: paymentMethod === "momo" ? "6px solid #a50064" : "2px solid var(--border)",
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "0.95rem" }}>
                      <i className="fa-solid fa-wallet" style={{ marginRight: "0.35rem", color: "#a50064" }}></i>
                      Ví MoMo
                      <span className="badge" style={{ marginLeft: "0.5rem", backgroundColor: "#fef0f8", color: "#a50064", fontSize: "0.6rem", border: "1px solid #a50064" }}>Sandbox</span>
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Thanh toán qua ví điện tử MoMo (môi trường test)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* DELIVERY ESTIMATE */}
            <div style={{
              background: "linear-gradient(135deg, var(--primary), hsl(142, 55%, 30%))",
              borderRadius: "20px", padding: "1.5rem 2rem", color: "white",
              display: "flex", alignItems: "center", gap: "1.25rem"
            }}>
              <i className="fa-solid fa-truck-fast" style={{ fontSize: "2rem", opacity: 0.8 }}></i>
              <div>
                <p style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Thời gian giao hàng dự kiến</p>
                <p style={{ fontSize: "1.25rem", fontWeight: "900" }}>
                  📦 {getDeliveryRange()}
                </p>
                <p style={{ fontSize: "0.8rem", opacity: 0.85, marginTop: "0.25rem" }}>Miễn phí vận chuyển cho đơn hàng thân thiện môi trường</p>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{ backgroundColor: "var(--card)", borderRadius: "24px", border: "1px solid var(--border)", padding: "2rem", boxShadow: "0 10px 30px var(--shadow)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--primary)", marginBottom: "1.5rem" }}>
                Tóm Tắt Đơn Hàng
              </h3>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                {checkoutItems.map((item) => (
                  <div key={item.productId} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <img src={item.image} alt={item.name} style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover", border: "1px solid var(--border)" }} />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>x{item.quantity} • {item.priceStr}</p>
                    </div>
                    <span style={{ fontWeight: "700", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                      {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                ))}
              </div>

              <hr style={{ border: "0", borderTop: "1px solid var(--border)", marginBottom: "1.25rem" }} />

              {/* VOUCHER INPUT */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                  <i className="fa-solid fa-ticket" style={{ marginRight: "0.35rem", color: "var(--accent)" }}></i>
                  Mã Voucher
                </label>
                {appliedVoucher ? (
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    backgroundColor: "var(--sentiment-pos-light)", borderRadius: "12px",
                    padding: "0.75rem 1rem", border: "1px solid var(--sentiment-pos)"
                  }}>
                    <div>
                      <p style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--sentiment-pos)" }}>
                        <i className="fa-solid fa-check-circle" style={{ marginRight: "0.25rem" }}></i>
                        {appliedVoucher.code} — Giảm {appliedVoucher.discount}%
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{appliedVoucher.description}</p>
                    </div>
                    <button onClick={removeVoucher} style={{
                      background: "transparent", border: "none", cursor: "pointer", color: "var(--sentiment-neg)", fontSize: "0.85rem"
                    }}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      value={voucherCode}
                      onChange={(e) => { setVoucherCode(e.target.value); setVoucherError(""); }}
                      placeholder="Nhập mã voucher..."
                      style={{
                        flex: 1, padding: "0.65rem 1rem", borderRadius: "10px",
                        border: `1px solid ${voucherError ? "#ef4444" : "var(--border)"}`,
                        backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.85rem"
                      }}
                    />
                    <button onClick={handleApplyVoucher} className="btn btn-outline" style={{ padding: "0.65rem 1rem", borderRadius: "10px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                      Áp dụng
                    </button>
                  </div>
                )}
                {voucherError && <p style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.25rem" }}>{voucherError}</p>}
              </div>

              <hr style={{ border: "0", borderTop: "1px solid var(--border)", marginBottom: "1.25rem" }} />

              {/* TOTALS */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Tạm tính</span>
                  <span style={{ fontWeight: "600" }}>{subtotal.toLocaleString("vi-VN")} đ</span>
                </div>
                {appliedVoucher && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--sentiment-pos)" }}>Giảm giá ({discountPercent}%)</span>
                    <span style={{ fontWeight: "600", color: "var(--sentiment-pos)" }}>-{discountAmount.toLocaleString("vi-VN")} đ</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Phí vận chuyển</span>
                  <span style={{ fontWeight: "600", color: "var(--sentiment-pos)" }}>Miễn phí</span>
                </div>
              </div>

              <hr style={{ border: "0", borderTop: "2px solid var(--primary)", marginBottom: "1.25rem" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.15rem", fontWeight: "700" }}>Tổng cộng</span>
                <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "var(--accent)" }}>
                  {total.toLocaleString("vi-VN")} đ
                </span>
              </div>

              {/* GreenCoin estimate */}
              <div style={{
                backgroundColor: "var(--sentiment-pos-light)", borderRadius: "12px",
                padding: "0.75rem 1rem", marginBottom: "1.5rem", display: "flex",
                alignItems: "center", gap: "0.5rem", fontSize: "0.85rem",
                fontWeight: "600", color: "var(--sentiment-pos)"
              }}>
                <i className="fa-solid fa-leaf"></i>
                Nhận +{greenCoinEstimate} GreenCoin sau khi đặt hàng!
              </div>

              {/* Payment error */}
              {errors.payment && (
                <div style={{ backgroundColor: "#fef2f2", borderRadius: "12px", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.85rem", color: "#ef4444", fontWeight: "600" }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "0.35rem" }}></i>
                  {errors.payment}
                </div>
              )}

              {/* PLACE ORDER */}
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={momoLoading}
                style={{
                  width: "100%", padding: "1rem", borderRadius: "14px", fontSize: "1.05rem", fontWeight: "700",
                  opacity: momoLoading ? 0.7 : 1, cursor: momoLoading ? "not-allowed" : "pointer",
                  background: paymentMethod === "momo" ? "linear-gradient(135deg, #a50064, #d82d8b)" : undefined,
                }}
              >
                {momoLoading ? (
                  <><i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "0.35rem" }}></i> Đang chuyển đến MoMo...</>
                ) : paymentMethod === "momo" ? (
                  <><i className="fa-solid fa-wallet" style={{ marginRight: "0.35rem" }}></i> Thanh Toán Qua MoMo</>
                ) : (
                  <><i className="fa-solid fa-lock" style={{ marginRight: "0.35rem" }}></i> Xác Nhận Đặt Hàng (COD)</>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: "0.25rem" }}></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Đang tải...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
