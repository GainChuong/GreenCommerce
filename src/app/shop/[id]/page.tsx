"use client";

import React, { useState, useEffect, use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  sentiment: "positive" | "neutral" | "negative";
  isGreenReview: boolean;
}

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  ecoScore: string;
  material: string;
  description: string;
  carbonFootprint: string;
  waterSaved: string;
  details: string[];
  initialReviews: Review[];
}

const PRODUCTS_DB: Record<string, ProductDetails> = {
  "1": {
    id: "1",
    name: "Áo Khoác Gió Recycled Ocean-Plastic",
    category: "Áo Khoác Nam/Nữ",
    price: "1,250,000 đ",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200",
    ecoScore: "A+",
    material: "100% Recycled Polyester (từ rác thải nhựa đại dương)",
    description: "Chiếc áo khoác gió siêu nhẹ, chống gió và chống nước cực tốt, được dệt hoàn toàn từ chai nhựa thu gom trên các vùng biển. Mỗi chiếc áo giúp làm sạch đại dương và giảm thiểu khí thải CO2 tới 45% so với sản xuất polyester thông thường.",
    carbonFootprint: "3.2 kg CO₂e (Thấp hơn 52% trung bình ngành)",
    waterSaved: "1,200 Lít nước sạch",
    details: [
      "Chất liệu chống thấm nước DWR thân thiện không chứa PFC.",
      "Có mũ trùm đầu điều chỉnh được và khóa kéo YKK tái sinh.",
      "Túi ngực có khóa kéo rộng rãi để đựng vật dụng.",
      "Có thể gấp gọn vào túi ngực tiện lợi khi di chuyển."
    ],
    initialReviews: [
      {
        id: 1,
        user: "Trần Minh Hoàng",
        avatar: "M",
        rating: 5,
        date: "24/05/2026",
        comment: "Áo mặc siêu nhẹ, cản gió rất tốt khi chạy bộ sáng sớm. Rất thích tinh thần tái chế rác thải đại dương của hãng. Sản phẩm rất bền vững!",
        sentiment: "positive",
        isGreenReview: true
      },
      {
        id: 2,
        user: "Nguyễn Khánh Linh",
        avatar: "K",
        rating: 5,
        date: "18/05/2026",
        comment: "Màu sắc nhã nhặn, phom áo rộng rãi thoải mái. Vải sờ vào rất mượt dù là nhựa tái chế. Ủng hộ các sản phẩm xanh thế này.",
        sentiment: "positive",
        isGreenReview: true
      },
      {
        id: 3,
        user: "Lê Hữu Tuấn",
        avatar: "H",
        rating: 4,
        date: "02/05/2026",
        comment: "Áo chống nước mưa nhẹ tốt, mặc đi phượt rất tiện. Tuy nhiên phần khóa kéo hơi rít nhẹ lúc đầu, dùng vài lần thì mượt hơn.",
        sentiment: "neutral",
        isGreenReview: false
      }
    ]
  },
  "2": {
    id: "2",
    name: "Balo Leo Núi Eco-Trail 30L",
    category: "Phụ Kiện Dã Ngoại",
    price: "1,890,000 đ",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200",
    ecoScore: "A",
    material: "100% Recycled Nylon (từ lưới đánh cá cũ)",
    description: "Balo chuyên dụng cho dã ngoại và leo núi với dung tích 30L. Được sản xuất từ lưới đánh cá bỏ hoang tái chế để bảo vệ hệ sinh thái san hô. Hệ thống đai trợ lực thông minh giúp bảo vệ cột sống tối đa.",
    carbonFootprint: "4.8 kg CO₂e (Thấp hơn 38% trung bình ngành)",
    waterSaved: "850 Lít nước sạch",
    details: [
      "Khung đệm lưng bằng lưới thoáng khí tổ ong chống mồ hôi.",
      "Đai hông và đai ngực có thể điều chỉnh linh hoạt.",
      "Tích hợp ngăn đựng túi nước chuyên dụng.",
      "Vải Nylon chống xước cao cấp, bảo hành 5 năm."
    ],
    initialReviews: [
      {
        id: 1,
        user: "Nguyễn Văn Đức",
        avatar: "Đ",
        rating: 5,
        date: "28/05/2026",
        comment: "Balo đựng được rất nhiều đồ, đệm lưng êm và thoáng mát cực kỳ. Sợi nylon tái chế từ lưới đánh cá mà chắc chắn kinh ngạc. Rất hài lòng!",
        sentiment: "positive",
        isGreenReview: true
      },
      {
        id: 2,
        user: "Phạm Minh Thư",
        avatar: "T",
        rating: 4,
        date: "12/05/2026",
        comment: "Balo thiết kế nhiều ngăn tiện lợi. Màu sắc đất rất đẹp và tự nhiên. Đóng gói hộp giấy bảo vệ môi trường rất kỹ.",
        sentiment: "positive",
        isGreenReview: false
      }
    ]
  },
  "3": {
    id: "3",
    name: "Áo Thun Polo Organic Cotton",
    category: "Áo Thun Unisex",
    price: "450,000 đ",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200",
    ecoScore: "A+",
    material: "100% Cotton Hữu Cơ (Organic Cotton)",
    description: "Áo thun polo cổ điển lịch sự, được làm từ bông hữu cơ trồng tự nhiên không sử dụng thuốc trừ sâu hóa học hay phân bón độc hại. An toàn tuyệt đối cho da nhạy cảm và bảo vệ sức khỏe đất trồng.",
    carbonFootprint: "1.5 kg CO₂e (Thấp hơn 60% trung bình ngành)",
    waterSaved: "2,400 Lít nước sạch",
    details: [
      "Vải dệt thun cá sấu dày dặn, đứng phom.",
      "Nhuộm màu tự nhiên chiết xuất từ cỏ cây thảo mộc.",
      "Cúc áo làm từ vỏ dừa tự nhiên ép nhiệt.",
      "Bền màu và hạn chế co rút tối đa khi giặt máy."
    ],
    initialReviews: [
      {
        id: 1,
        user: "Lê Hoàng Yến",
        avatar: "Y",
        rating: 5,
        date: "01/06/2026",
        comment: "Chất vải organic cotton mặc mát rượi, sờ rất mềm mịn tay. Thích nhất là cúc áo làm bằng vỏ dừa nhìn rất độc đáo và eco-friendly.",
        sentiment: "positive",
        isGreenReview: true
      },
      {
        id: 2,
        user: "Phan Anh Tuấn",
        avatar: "A",
        rating: 5,
        date: "25/05/2026",
        comment: "Áo lên dáng đẹp, nhuộm màu tự nhiên nhìn mộc mạc và sang. Cảm giác mặc chiếc áo bảo vệ được môi trường rất ý nghĩa.",
        sentiment: "positive",
        isGreenReview: true
      }
    ]
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const product = PRODUCTS_DB[productId] || PRODUCTS_DB["1"]; // Default to '1' if not found

  const router = useRouter();
  const { isLoggedIn, addToCart } = useAuth();
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=/shop/${productId}`);
      return;
    }
    // Parse price string to number
    const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    addToCart({
      productId: product.id,
      name: product.name,
      price: priceNum,
      priceStr: product.price,
      image: product.image,
      ecoScore: product.ecoScore,
    });
    setCartNotification(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
    setTimeout(() => setCartNotification(null), 3500);
  };

  // Review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState("");
  
  // Real-time Sentiment Analysis simulation states
  const [typingSentiment, setTypingSentiment] = useState<"positive" | "neutral" | "negative">("neutral");
  const [typingScore, setTypingScore] = useState(50); // 0 to 100
  const [detectedGreenKeywords, setDetectedGreenKeywords] = useState<string[]>([]);
  const [greenCoinReward, setGreenCoinReward] = useState<number | null>(null);

  // Load product reviews
  useEffect(() => {
    setReviews(product.initialReviews);
  }, [product]);

  // Real-time text analysis mockup (Simulating the AI model running on input change)
  useEffect(() => {
    if (newReviewText.trim() === "") {
      setTypingSentiment("neutral");
      setTypingScore(50);
      setDetectedGreenKeywords([]);
      return;
    }

    const text = newReviewText.toLowerCase();

    // Key lists
    const posWords = ["bền", "tốt", "đẹp", "mát", "êm", "thích", "hài lòng", "yêu", "xịn", "chất lượng", "ưng ý", "recommend"];
    const negWords = ["tệ", "hỏng", "rách", "kém", "mỏng", "đắt", "chật", "rít", "thất vọng", "xấu", "nóng", "bí"];
    const greenWords = ["tái chế", "recycled", "hữu cơ", "organic", "thiên nhiên", "môi trường", "xanh", "bền vững", "tự nhiên", "eco", "vỏ dừa", "giảm thiểu"];

    // Count frequencies
    let posCount = 0;
    let negCount = 0;
    let detectedGreens: string[] = [];

    posWords.forEach(w => {
      if (text.includes(w)) posCount += 1.5;
    });
    negWords.forEach(w => {
      if (text.includes(w)) negCount += 1.5;
    });
    greenWords.forEach(w => {
      if (text.includes(w)) {
        posCount += 0.5; // Green keywords add to positive sentiment
        if (!detectedGreens.includes(w)) {
          detectedGreens.push(w);
        }
      }
    });

    setDetectedGreenKeywords(detectedGreens);

    // Calculate score
    const total = posCount + negCount;
    let score = 50;

    if (total > 0) {
      score = Math.round((posCount / total) * 100);
    } else {
      score = 50; // Neutral if no keywords
    }

    setTypingScore(score);

    if (score > 60) {
      setTypingSentiment("positive");
    } else if (score < 40) {
      setTypingSentiment("negative");
    } else {
      setTypingSentiment("neutral");
    }
  }, [newReviewText]);

  // Aggregate global sentiment score from all reviews
  const sentimentStats = useMemo(() => {
    if (reviews.length === 0) return { posPct: 100, neuPct: 0, negPct: 0, trustScore: 100 };
    
    let pos = 0;
    let neu = 0;
    let neg = 0;

    reviews.forEach(r => {
      if (r.sentiment === "positive") pos++;
      else if (r.sentiment === "neutral") neu++;
      else neg++;
    });

    const total = reviews.length;
    const posPct = Math.round((pos / total) * 100);
    const neuPct = Math.round((neu / total) * 100);
    const negPct = Math.round((neg / total) * 100);
    
    // Green trust score calculation (weighted positive + eco contributions)
    const greenReviews = reviews.filter(r => r.isGreenReview).length;
    const trustScore = Math.min(100, Math.round(((pos + (greenReviews * 0.2)) / total) * 100));

    return { posPct, neuPct, negPct, trustScore };
  }, [reviews]);

  // Handle review submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewText.trim() === "" || userName.trim() === "") return;

    const isGreen = detectedGreenKeywords.length > 0;
    const reviewSentiment = typingSentiment;

    const newReview: Review = {
      id: reviews.length + 1,
      user: userName,
      avatar: userName.charAt(0).toUpperCase(),
      rating: newRating,
      date: new Date().toLocaleDateString("vi-VN"),
      comment: newReviewText,
      sentiment: reviewSentiment,
      isGreenReview: isGreen
    };

    setReviews([newReview, ...reviews]);
    
    // GreenCoin reward popup trigger
    if (isGreen) {
      setGreenCoinReward(15);
    } else {
      setGreenCoinReward(5); // Basic review reward
    }

    // Reset form
    setNewReviewText("");
    setUserName("");
    setNewRating(5);

    // Auto close reward alert after 5 seconds
    setTimeout(() => {
      setGreenCoinReward(null);
    }, 5000);
  };

  return (
    <div style={{ padding: "3rem 0" }}>
      {/* CART ADDED TOAST */}
      {cartNotification && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "var(--primary)",
          color: "white",
          padding: "1rem 2rem",
          borderRadius: "15px",
          boxShadow: "0 10px 30px var(--shadow-lg)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontWeight: "600",
          fontSize: "0.9rem",
          animation: "fadeInUp 0.3s ease"
        }}>
          <i className="fa-solid fa-bag-shopping"></i>
          {cartNotification}
          <Link href="/cart" style={{ color: "var(--accent)", fontWeight: "700", marginLeft: "0.5rem" }}>Xem giỏ →</Link>
        </div>
      )}
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <Link href="/">Trang chủ</Link> / <Link href="/shop">Cửa hàng</Link> / <span style={{ color: "var(--primary)", fontWeight: "600" }}>{product.name}</span>
        </div>

        {/* REWARD ALERT */}
        {greenCoinReward !== null && (
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "var(--primary)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "15px",
            boxShadow: "0 10px 30px var(--shadow-lg)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "2px solid var(--accent)",
            animation: "fadeInUp 0.3s ease"
          }}>
            <i className="fa-solid fa-circle-check" style={{ fontSize: "1.5rem", color: "var(--accent)" }}></i>
            <div>
              <h4 style={{ fontWeight: "700" }}>Phân tích AI hoàn tất!</h4>
              <p style={{ fontSize: "0.85rem" }}>
                Cảm ơn đánh giá của bạn. Bạn được cộng <strong>+{greenCoinReward} GreenCoin</strong>! 🍀
              </p>
            </div>
            <button 
              onClick={() => setGreenCoinReward(null)} 
              style={{ background: "transparent", border: "0", color: "white", cursor: "pointer", marginLeft: "1rem" }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* PRODUCT OVERVIEW */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "4rem",
          marginBottom: "5rem"
        }}>
          
          {/* LEFT: Image */}
          <div style={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 15px 40px var(--shadow)",
            height: "550px",
            backgroundColor: "var(--card)"
          }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* RIGHT: Main Details */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span className="badge badge-primary" style={{ fontSize: "0.8rem" }}>Eco-Score: {product.ecoScore}</span>
              <span className="badge badge-accent" style={{ fontSize: "0.8rem" }}>1% For Planet</span>
            </div>

            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--primary)", marginBottom: "1rem", lineHeight: "1.2" }}>
              {product.name}
            </h1>

            <p style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--accent)", marginBottom: "1.5rem" }}>
              {product.price}
            </p>

            <div style={{
              backgroundColor: "var(--card)",
              borderRadius: "16px",
              padding: "1.5rem",
              border: "1px solid var(--border)",
              marginBottom: "1.5rem"
            }}>
              <p style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
                🌿 Nguyên liệu thân thiện:
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                {product.material}
              </p>
            </div>

            <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
              {product.description}
            </p>

            {/* Impact boxes */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "2.5rem"
            }}>
              <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "1rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Dấu chân Carbon</span>
                <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--primary)" }}>{product.carbonFootprint}</p>
              </div>
              <div style={{ borderLeft: "4px solid var(--accent)", paddingLeft: "1rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Nước Tiết Kiệm</span>
                <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--accent)" }}>{product.waterSaved}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={handleAddToCart} className="btn btn-outline" style={{ flexGrow: 1, padding: "1rem", borderRadius: "12px", fontSize: "1rem", borderColor: "var(--primary)", color: "var(--primary)" }}>
                <i className="fa-solid fa-bag-shopping" style={{ marginRight: "0.35rem" }}></i>
                Thêm vào Giỏ Hàng
              </button>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push(`/auth/login?redirect=/checkout?buyNow=${productId}`);
                    return;
                  }
                  router.push(`/checkout?buyNow=${productId}`);
                }}
                className="btn btn-primary"
                style={{ flexGrow: 1, padding: "1rem", borderRadius: "12px", fontSize: "1rem" }}
              >
                <i className="fa-solid fa-bolt" style={{ marginRight: "0.35rem" }}></i>
                Mua Ngay
              </button>
            </div>
          </div>

        </div>

        {/* SPECIFICATIONS & IMPACT DETAILS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3rem",
          borderTop: "1px solid var(--border)",
          paddingTop: "3rem",
          marginBottom: "5rem"
        }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--primary)" }}>
              Chi tiết Thiết kế & Tác động
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {product.details.map((detail, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "start", gap: "0.5rem", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                  <i className="fa-solid fa-circle-check" style={{ color: "var(--primary)", marginTop: "0.25rem" }}></i>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI SENTIMENT DASHBOARD */}
          <div style={{
            backgroundColor: "var(--card)",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            padding: "2rem",
            boxShadow: "0 10px 30px var(--shadow)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: "0.5rem" }}>AI Analytics</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--foreground)" }}>Chỉ Số Cảm Xúc Khách Hàng</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "2rem", fontWeight: "900", color: "var(--primary)", lineHeight: "1" }}>
                  {sentimentStats.trustScore}%
                </span>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>Green Trust Score</p>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.5" }}>
              Được tự động tổng hợp bằng mô hình AI phân tích sắc thái của tất cả các bài review thực tế của người tiêu dùng đối với sản phẩm này.
            </p>

            {/* Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              {/* Positive */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--sentiment-pos)" }}><i className="fa-solid fa-face-smile"></i> Tích cực</span>
                  <span>{sentimentStats.posPct}%</span>
                </div>
                <div style={{ height: "8px", width: "100%", backgroundColor: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sentimentStats.posPct}%`, backgroundColor: "var(--sentiment-pos)" }} />
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--sentiment-neu)" }}><i className="fa-solid fa-face-meh"></i> Trung lập</span>
                  <span>{sentimentStats.neuPct}%</span>
                </div>
                <div style={{ height: "8px", width: "100%", backgroundColor: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sentimentStats.neuPct}%`, backgroundColor: "var(--sentiment-neu)" }} />
                </div>
              </div>

              {/* Negative */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--sentiment-neg)" }}><i className="fa-solid fa-face-frown"></i> Tiêu cực</span>
                  <span>{sentimentStats.negPct}%</span>
                </div>
                <div style={{ height: "8px", width: "100%", backgroundColor: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sentimentStats.negPct}%`, backgroundColor: "var(--sentiment-neg)" }} />
                </div>
              </div>
            </div>

            {/* AI Word Cloud Mock */}
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "0.75rem" }}>
                Từ khóa nổi bật từ AI:
              </span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span className="badge badge-primary" style={{ textTransform: "none", fontSize: "0.75rem" }}>#siêu_nhẹ</span>
                <span className="badge badge-primary" style={{ textTransform: "none", fontSize: "0.75rem" }}>#vải_tái_chế_mượt</span>
                <span className="badge badge-primary" style={{ textTransform: "none", fontSize: "0.75rem" }}>#cản_gió_tốt</span>
                <span className="badge badge-accent" style={{ textTransform: "none", fontSize: "0.75rem" }}>#bền_vững</span>
                <span className="badge badge-success" style={{ textTransform: "none", fontSize: "0.75rem" }}>#bảo_vệ_môi_trường</span>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--primary)", marginBottom: "2rem" }}>
            Đánh Giá & Nhận Xét từ Khách Hàng
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "4rem",
            alignItems: "start"
          }}>
            
            {/* WRITE A REVIEW + INTERACTIVE AI FEEDBACK */}
            <div style={{
              backgroundColor: "var(--card)",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              padding: "2rem",
              position: "sticky",
              top: "90px",
              boxShadow: "0 10px 30px var(--shadow)"
            }}>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "1.5rem" }}>Đánh Giá Sản Phẩm</h4>
              
              <form onSubmit={handleReviewSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Họ & Tên</label>
                  <input 
                    type="text" 
                    placeholder="Nhập tên của bạn..." 
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>Đánh giá số sao</label>
                  <select 
                    value={newRating} 
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      cursor: "pointer"
                    }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 sao - Tuyệt vời)</option>
                    <option value="4">⭐⭐⭐⭐ (4 sao - Tốt)</option>
                    <option value="3">⭐⭐⭐ (3 sao - Bình thường)</option>
                    <option value="2">⭐⭐ (2 sao - Kém)</option>
                    <option value="1">⭐ (1 sao - Rất tệ)</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.35rem" }}>
                    Nội dung nhận xét
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Viết đánh giá của bạn tại đây..."
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      resize: "none"
                    }}
                  />
                </div>

                {/* REAL-TIME AI SENTIMENT VISUALIZER */}
                {newReviewText.trim().length > 0 && (
                  <div style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "1rem",
                    marginBottom: "1.5rem"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)" }}>
                        <i className="fa-solid fa-robot"></i> Mô Phỏng Phân Tích AI:
                      </span>
                      <span className="badge" style={{
                        backgroundColor: 
                          typingSentiment === "positive" ? "var(--sentiment-pos-light)" : 
                          typingSentiment === "negative" ? "var(--sentiment-neg-light)" : 
                          "var(--sentiment-neu-light)",
                        color: 
                          typingSentiment === "positive" ? "var(--sentiment-pos)" : 
                          typingSentiment === "negative" ? "var(--sentiment-neg)" : 
                          "var(--sentiment-neu)",
                        textTransform: "none",
                        fontSize: "0.7rem"
                      }}>
                        {typingSentiment === "positive" ? "😊 Tích cực" : 
                         typingSentiment === "negative" ? "😠 Tiêu cực" : 
                         "😐 Trung lập"}
                      </span>
                    </div>

                    {/* Progress score */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <div style={{ height: "6px", flexGrow: 1, backgroundColor: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ 
                          height: "100%", 
                          width: `${typingScore}%`, 
                          backgroundColor: 
                            typingScore > 60 ? "var(--sentiment-pos)" : 
                            typingScore < 40 ? "var(--sentiment-neg)" : 
                            "var(--sentiment-neu)",
                          transition: "all 0.2s ease" 
                        }} />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>{typingScore}%</span>
                    </div>

                    {/* Detected green words */}
                    {detectedGreenKeywords.length > 0 ? (
                      <div style={{ fontSize: "0.75rem", color: "var(--sentiment-pos)", display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" }}>
                        <i className="fa-solid fa-leaf"></i>
                        <span>Phát hiện từ khóa Xanh: </span>
                        {detectedGreenKeywords.map(w => (
                          <strong key={w} style={{ backgroundColor: "var(--sentiment-pos-light)", padding: "0.05rem 0.25rem", borderRadius: "4px" }}>
                            #{w}
                          </strong>
                        ))}
                        <span style={{ color: "var(--accent)", marginLeft: "0.25rem" }}>(Được tặng +15 GreenCoin!)</span>
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        💡 Nhắc tới vật liệu <strong>hữu cơ, tái chế, bảo vệ môi trường, xanh</strong> để nhận ngay +15 GreenCoin!
                      </p>
                    )}
                  </div>
                )}

                <button className="btn btn-primary" type="submit" style={{ width: "100%", borderRadius: "10px" }}>
                  Gửi Nhận Xét & Phân Tích
                </button>
              </form>
            </div>

            {/* REVIEWS LIST DISPLAY */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {reviews.map(review => (
                <div key={review.id} style={{
                  backgroundColor: "var(--card)",
                  borderRadius: "20px",
                  border: "1px solid var(--border)",
                  padding: "1.5rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    
                    {/* User info */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700"
                      }}>
                        {review.avatar}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: "700", fontSize: "0.95rem" }}>{review.user}</h4>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{review.date}</span>
                      </div>
                    </div>

                    {/* Review Badge */}
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {review.isGreenReview && (
                        <span className="badge badge-primary" style={{ fontSize: "0.65rem", textTransform: "none" }}>
                          <i className="fa-solid fa-leaf"></i> Đánh Giá Xanh
                        </span>
                      )}
                      
                      <span className="badge" style={{
                        backgroundColor: 
                          review.sentiment === "positive" ? "var(--sentiment-pos-light)" : 
                          review.sentiment === "negative" ? "var(--sentiment-neg-light)" : 
                          "var(--sentiment-neu-light)",
                        color: 
                          review.sentiment === "positive" ? "var(--sentiment-pos)" : 
                          review.sentiment === "negative" ? "var(--sentiment-neg)" : 
                          "var(--sentiment-neu)",
                        textTransform: "none",
                        fontSize: "0.65rem"
                      }}>
                        {review.sentiment === "positive" ? "😊 Tích cực" : 
                         review.sentiment === "negative" ? "😠 Tiêu cực" : 
                         "😐 Trung lập"}
                      </span>
                    </div>

                  </div>

                  <div style={{ color: "var(--accent)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                    {"⭐".repeat(review.rating)}
                  </div>

                  <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--foreground)" }}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
