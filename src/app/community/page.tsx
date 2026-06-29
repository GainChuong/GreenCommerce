"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RewardItem {
  id: number;
  name: string;
  cost: number;
  image: string;
  description: string;
  category: "discount" | "action" | "gift";
}

const REWARDS_DB: RewardItem[] = [
  {
    id: 1,
    name: "Góp Sức Trồng 1 Cây Xanh",
    cost: 50,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=300",
    description: "ReFashion sẽ thay mặt bạn trồng 1 cây xanh tại rừng ngập mặn Cần Giờ. Nhận chứng nhận điện tử qua Email.",
    category: "action"
  },
  {
    id: 2,
    name: "Voucher Giảm Giá 20%",
    cost: 100,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=300",
    description: "Mã giảm giá 20% áp dụng cho mọi đơn hàng xanh tiếp theo tại ReFashion. Hạn dùng 30 ngày.",
    category: "discount"
  },
  {
    id: 3,
    name: "Bình Nước Thép Không Gỉ Eco",
    cost: 200,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300",
    description: "Bình giữ nhiệt chất liệu thép không gỉ cao cấp giúp bạn giảm thiểu sử dụng chai nhựa dùng 1 lần.",
    category: "gift"
  },
  {
    id: 4,
    name: "Túi Tote Sợi Đay Mộc Mạc",
    cost: 80,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
    description: "Túi vải tote dệt từ sợi đay tự nhiên siêu bền, thích hợp đi chợ, đi học và dã ngoại.",
    category: "gift"
  }
];

export default function Community() {
  const router = useRouter();
  const { user, isLoggedIn, addDonation, spendGreenCoin, redeemVoucher } = useAuth();

  // Use user's greenCoin from context
  const balance = user?.greenCoin ?? 0;

  // Donation form states
  const [clothingType, setClothingType] = useState("shirt");
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("good");
  const [pickupAddress, setPickupAddress] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);

  // Redeem states
  const [notification, setNotification] = useState("");

  // Handle Donation
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/community");
      return;
    }

    if (pickupAddress.trim() === "") return;

    // Use auth context donation method
    const rewardedCoins = addDonation({
      clothingType,
      quantity,
      condition,
      address: pickupAddress,
    });

    setDonationSuccess(true);
    setPickupAddress("");
    setQuantity(1);

    showNotification(`🍀 Quyên góp thành công! Bạn được cộng +${rewardedCoins} GreenCoin.`);

    setTimeout(() => {
      setDonationSuccess(false);
    }, 5000);
  };

  // Handle Redeem
  const handleRedeem = (item: RewardItem) => {
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/community");
      return;
    }

    // For discount-type rewards, create a real voucher
    if (item.category === "discount") {
      // Extract discount percentage from name (e.g. "Voucher Giảm Giá 20%")
      const discountMatch = item.name.match(/(\d+)%/);
      const discount = discountMatch ? parseInt(discountMatch[1]) : 20;

      const voucher = redeemVoucher(item.cost, discount, item.name);
      if (!voucher) {
        showNotification(`❌ Bạn không đủ GreenCoin. Cần thêm ${item.cost - balance} GreenCoin.`);
        return;
      }

      showNotification(`🎟️ Đổi voucher thành công! Mã của bạn: ${voucher.code} (Giảm ${discount}%, HSD: ${voucher.expiresAt}). Áp dụng khi thanh toán!`);
      return;
    }

    // For non-discount rewards, just spend coins
    const success = spendGreenCoin(item.cost);
    if (!success) {
      showNotification(`❌ Bạn không đủ GreenCoin. Cần thêm ${item.cost - balance} GreenCoin.`);
      return;
    }

    showNotification(`🎉 Đổi quà thành công! Bạn đã nhận: "${item.name}".`);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
          <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Cộng Đồng Hành Tinh</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
            Trái Đất Xanh Hơn Mỗi Ngày
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Tham gia quyên góp quần áo cũ để nhận điểm thưởng GreenCoin và cùng chung tay tài trợ các dự án phục hồi sinh thái.
          </p>
        </div>

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

        {/* TOP PANEL: COIN BALANCE & CAMPAIGNS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "2.5rem",
          marginBottom: "4rem"
        }}>
          
          {/* GREEN COIN WALLET CARD */}
          <div style={{
            backgroundColor: "var(--primary)",
            color: "white",
            padding: "2.5rem",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 15px 35px var(--primary-light)",
            position: "relative",
            overflow: "hidden"
          }} className="animate-pulse-soft">
            {/* Background decoration */}
            <div style={{
              position: "absolute",
              right: "-20px",
              bottom: "-20px",
              fontSize: "10rem",
              opacity: 0.1,
              color: "white",
              pointerEvents: "none"
            }}>
              <i className="fa-solid fa-leaf"></i>
            </div>

            <div>
              <span style={{ 
                fontSize: "0.85rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.1em",
                fontWeight: "700",
                color: "var(--accent)"
              }}>
                Ví GreenCoin Của Bạn
              </span>
              <h2 style={{ fontSize: "3.5rem", fontWeight: "900", margin: "0.5rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isLoggedIn ? balance : "—"} <i className="fa-solid fa-leaf" style={{ fontSize: "2.5rem", color: "var(--accent)" }}></i>
              </h2>
              {!isLoggedIn && (
                <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                  <a
                    href="/auth/login?redirect=/community"
                    style={{ color: "var(--accent)", fontWeight: "700", textDecoration: "underline" }}
                  >
                    Đăng nhập
                  </a>{" "}để xem số dư GreenCoin
                </p>
              )}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", opacity: 0.85, lineHeight: "1.5" }}>
                🍀 Cách kiếm thêm coin:<br />
                • Viết đánh giá sản phẩm có từ khóa xanh (+15 coin)<br />
                • Quyên góp quần áo cũ (+15 coin/sản phẩm)
              </p>
            </div>
          </div>

          {/* ACTIVE CAMPAIGNS */}
          <div style={{
            backgroundColor: "var(--card)",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            padding: "2rem",
            boxShadow: "0 10px 30px var(--shadow)"
          }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--primary)", marginBottom: "1.25rem" }}>
              Chiến Dịch Bảo Vệ Môi Trường Đang Diễn Ra
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Campaign 1 */}
              <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                  <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="badge badge-primary" style={{ fontSize: "0.65rem", marginBottom: "0.25rem" }}>Hoạt động tháng 6</span>
                  <h4 style={{ fontWeight: "700", fontSize: "0.95rem" }}>Ngày hội Dọn Rác & Làm Sạch Bờ Biển Vũng Tàu</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                    Tham gia cùng hơn 200 tình nguyện viên nhặt rác nhựa, bảo vệ đại dương. Nhận ngay 100 GreenCoin khi đăng ký tham dự.
                  </p>
                  <a
                    href="https://tnmtvungtau.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.85rem", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                    Xem Chi Tiết
                  </a>
                </div>
              </div>

              {/* Campaign 2 */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="badge badge-accent" style={{ fontSize: "0.65rem", marginBottom: "0.25rem" }}>Dự án rừng xanh</span>
                  <h4 style={{ fontWeight: "700", fontSize: "0.95rem" }}>Quyên Góp Phủ Xanh 10 Hecta Rừng Ngập Mặn</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                    Chúng tôi đang phối hợp trồng rừng chống ngập. Nhấn đổi 50 GreenCoin để thay thế 1 cây con trồng thật tế.
                  </p>
                  <a
                    href="https://www.thiennhien.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.85rem", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }}></i>
                    Xem Chi Tiết
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* DONATION FORM & REWARDS SECTION */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.8fr",
          gap: "4rem"
        }}>
          
          {/* CLOTHES DONATION FORM */}
          <div style={{
            backgroundColor: "var(--card)",
            padding: "2.5rem",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 30px var(--shadow)"
          }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Quyên Góp Quần Áo Cũ
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.5" }}>
              Quần áo không dùng nữa của bạn sẽ được chúng tôi phân loại để làm từ thiện hoặc tái sinh kéo sợi làm vải mới.
            </p>

            {/* Donation success alert */}
            {donationSuccess && (
              <div style={{
                backgroundColor: "var(--sentiment-pos-light)",
                border: "1px solid var(--sentiment-pos)",
                borderRadius: "12px",
                padding: "0.85rem 1rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                color: "var(--sentiment-pos)",
                fontWeight: "600"
              }}>
                <i className="fa-solid fa-circle-check"></i>
                Quyên góp thành công! GreenCoin đã được cộng vào ví.
              </div>
            )}

            <form onSubmit={handleDonationSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                  Loại sản phẩm
                </label>
                <select 
                  value={clothingType} 
                  onChange={(e) => setClothingType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                >
                  <option value="shirt">Áo Thun / Áo Sơ Mi</option>
                  <option value="jacket">Áo Khoác</option>
                  <option value="pants">Quần Jean / Kaki</option>
                  <option value="dress">Váy / Đầm</option>
                  <option value="others">Khác</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Số lượng</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={50}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Tình trạng đồ</label>
                  <select 
                    value={condition} 
                    onChange={(e) => setCondition(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)"
                    }}
                  >
                    <option value="new">Còn rất mới (Mác/Ít mặc)</option>
                    <option value="good">Còn tốt (Có thể mặc tiếp)</option>
                    <option value="reusable">Hơi cũ (Có thể kéo sợi tái sinh)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                  Địa chỉ lấy đồ (Nhân viên ReFashion sẽ đến lấy)
                </label>
                <input 
                  type="text" 
                  placeholder="Nhập địa chỉ nhà của bạn..." 
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: "100%", borderRadius: "10px" }}>
                {isLoggedIn ? "Đăng Ký Quyên Góp Ngay" : "Đăng Nhập Để Quyên Góp"}
              </button>
            </form>
          </div>

          {/* GREEN COIN REWARDS STORE */}
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Cửa Hàng Quà Tặng Xanh
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
              Quy đổi số điểm GreenCoin tích lũy được từ các hoạt động xanh để nhận các sản phẩm hoặc đóng góp cho Trái Đất.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem"
            }}>
              {REWARDS_DB.map(item => (
                <div key={item.id} style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 15px var(--shadow)"
                }}>
                  <div style={{ height: "140px", width: "100%", overflow: "hidden" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h4 style={{ fontWeight: "700", fontSize: "0.95rem", marginBottom: "0.5rem", color: "var(--foreground)" }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: "1.4", flexGrow: 1 }}>
                      {item.description}
                    </p>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "0.75rem"
                    }}>
                      <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        {item.cost} <i className="fa-solid fa-leaf" style={{ fontSize: "0.9rem", color: "var(--accent)" }}></i>
                      </span>

                      <button 
                        className="btn btn-outline" 
                        onClick={() => handleRedeem(item)}
                        style={{ 
                          padding: "0.4rem 0.85rem", 
                          fontSize: "0.8rem", 
                          borderRadius: "8px", 
                          backgroundColor: isLoggedIn && balance >= item.cost ? "var(--primary-light)" : "transparent",
                          color: isLoggedIn && balance >= item.cost ? "var(--primary)" : "var(--foreground)",
                          borderColor: isLoggedIn && balance >= item.cost ? "var(--primary)" : "var(--border)"
                        }}
                      >
                        {isLoggedIn ? "Đổi Quà" : "Đăng Nhập"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
