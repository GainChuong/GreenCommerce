"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceStr: string;
  image: string;
  ecoScore: string;
  sentimentScore: number;
  material: string;
  ratingCount: number;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Áo Khoác Gió Recycled Ocean-Plastic",
    category: "jacket",
    price: 1250000,
    priceStr: "1,250,000 đ",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600",
    ecoScore: "A+",
    sentimentScore: 98,
    material: "Recycled Polyester",
    ratingCount: 124
  },
  {
    id: "2",
    name: "Balo Leo Núi Eco-Trail 30L",
    category: "backpack",
    price: 1890000,
    priceStr: "1,890,000 đ",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600",
    ecoScore: "A",
    sentimentScore: 95,
    material: "Recycled Nylon",
    ratingCount: 89
  },
  {
    id: "3",
    name: "Áo Thun Polo Organic Cotton",
    category: "tshirt",
    price: 450000,
    priceStr: "450,000 đ",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600",
    ecoScore: "A+",
    sentimentScore: 97,
    material: "Organic Cotton",
    ratingCount: 240
  },
  {
    id: "4",
    name: "Quần Kaki Bền Vững Sợi Gai Dầu (Hemp)",
    category: "pants",
    price: 890000,
    priceStr: "890,000 đ",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600",
    ecoScore: "A",
    sentimentScore: 92,
    material: "Hemp (Sợi Gai Dầu)",
    ratingCount: 56
  },
  {
    id: "5",
    name: "Túi Đeo Vai Canvas Tái Sinh",
    category: "backpack",
    price: 180000,
    priceStr: "180,000 đ",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    ecoScore: "B",
    sentimentScore: 90,
    material: "Recycled Cotton",
    ratingCount: 42
  },
  {
    id: "6",
    name: "Giày Thể Thao Eco-Step Bamboo Fiber",
    category: "shoes",
    price: 1450000,
    priceStr: "1,450,000 đ",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
    ecoScore: "A",
    sentimentScore: 94,
    material: "Bamboo Fiber (Sợi Tre)",
    ratingCount: 75
  }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEcoScore, setSelectedEcoScore] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Eco Score
    if (selectedEcoScore !== "all") {
      result = result.filter(p => p.ecoScore === selectedEcoScore);
    }

    // Filter by Material
    if (selectedMaterial !== "all") {
      result = result.filter(p => p.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.material.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "sentiment") {
      result.sort((a, b) => b.sentimentScore - a.sentimentScore);
    }

    return result;
  }, [selectedCategory, selectedEcoScore, selectedMaterial, searchQuery, sortBy]);

  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        
        {/* SHOP HEADER */}
        <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
          <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Cửa Hàng Xanh</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
            Mua Sắm Có Trách Nhiệm
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Mỗi sản phẩm đều hiển thị chỉ số Eco-Score và điểm phân tích cảm xúc từ AI dựa trên đánh giá thực tế của cộng đồng.
          </p>
        </div>

        {/* SHOP MAIN LAYOUT */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "3rem",
          alignItems: "start"
        }}>
          
          {/* SIDEBAR FILTERS */}
          <aside style={{
            position: "sticky",
            top: "90px",
            backgroundColor: "var(--card)",
            padding: "2rem",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 20px var(--shadow)"
          }}>
            
            {/* Search Filter */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--primary)" }}>
                <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "0.4rem" }}></i>
                Tìm kiếm
              </h3>
              <div style={{ position: "relative" }}>
                <i className="fa-solid fa-magnifying-glass" style={{
                  position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)",
                  color: searchQuery ? "var(--primary)" : "var(--text-muted)", fontSize: "0.85rem",
                  transition: "color 0.2s"
                }}></i>
                <input
                  type="text"
                  placeholder="Tên sản phẩm, chất liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 2.25rem 0.6rem 2.25rem",
                    borderRadius: "10px",
                    border: `1.5px solid ${searchQuery ? "var(--primary)" : "var(--border)"}`,
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box"
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute", right: "0.7rem", top: "50%", transform: "translateY(-50%)",
                      background: "transparent", border: 0, color: "var(--text-muted)",
                      cursor: "pointer", fontSize: "0.9rem", lineHeight: 1
                    }}
                    title="Xóa tìm kiếm"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
              {searchQuery && (
                <p style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "0.35rem", fontWeight: 600 }}>
                  Đang tìm: &quot;{searchQuery}&quot;
                </p>
              )}
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--primary)" }}>Danh mục</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "tshirt", label: "Áo thun" },
                  { value: "jacket", label: "Áo khoác" },
                  { value: "pants", label: "Quần kaki" },
                  { value: "backpack", label: "Balo & Túi" },
                  { value: "shoes", label: "Giày xanh" }
                ].map(cat => (
                  <label key={cat.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat.value}
                      onChange={() => setSelectedCategory(cat.value)}
                      style={{ accentColor: "var(--primary)" }}
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Eco Score Filter */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--primary)" }}>Huy hiệu Eco-Score</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { value: "all", label: "Tất cả mức độ" },
                  { value: "A+", label: "Mức A+ (Tối ưu nhất)" },
                  { value: "A", label: "Mức A (Rất thân thiện)" },
                  { value: "B", label: "Mức B (Khá thân thiện)" }
                ].map(eco => (
                  <label key={eco.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="ecoscore" 
                      checked={selectedEcoScore === eco.value}
                      onChange={() => setSelectedEcoScore(eco.value)}
                      style={{ accentColor: "var(--primary)" }}
                    />
                    {eco.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--primary)" }}>Vật liệu</h3>
              <select 
                value={selectedMaterial} 
                onChange={(e) => setSelectedMaterial(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                <option value="all">Tất cả vật liệu</option>
                <option value="cotton">Cotton Hữu Cơ</option>
                <option value="recycled">Vật liệu Tái Chế</option>
                <option value="hemp">Sợi Gai Dầu (Hemp)</option>
                <option value="bamboo">Sợi Tre (Bamboo)</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button 
              className="btn btn-outline" 
              onClick={() => {
                setSelectedCategory("all");
                setSelectedEcoScore("all");
                setSelectedMaterial("all");
                setSearchQuery("");
                setSortBy("default");
              }}
              style={{ width: "100%", padding: "0.5rem 1rem", fontSize: "0.85rem", borderRadius: "10px" }}
            >
              Xóa tất cả bộ lọc
            </button>
          </aside>

          {/* PRODUCTS LIST AREA */}
          <div>
            
            {/* Filter toolbar & Info */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm xanh
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Sắp xếp:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                    fontSize: "0.9rem",
                    cursor: "pointer"
                  }}
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá từ thấp đến cao</option>
                  <option value="price-desc">Giá từ cao đến thấp</option>
                  <option value="sentiment">Độ tích cực AI cao nhất</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem"
              }}>
                {filteredProducts.map(product => (
                  <div key={product.id} style={{
                    backgroundColor: "var(--card)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "0 10px 30px var(--shadow)",
                    transition: "all 0.3s ease",
                    position: "relative"
                  }} className="card-hover">
                    
                    {/* Eco Score Badge */}
                    <span style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "30px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      zIndex: 2
                    }}>
                      Eco-Score: {product.ecoScore}
                    </span>

                    {/* Product Image */}
                    <div style={{ position: "relative", height: "260px", width: "100%", overflow: "hidden" }}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease"
                        }}
                        className="product-img"
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                        {product.material}
                      </span>
                      <h2 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0.35rem 0 0.75rem 0", color: "var(--foreground)", height: "44px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {product.name}
                      </h2>
                      
                      {/* Price & Sentiment */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--primary)" }}>
                          {product.priceStr}
                        </span>
                        
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "0.3rem",
                          backgroundColor: "var(--sentiment-pos-light)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "30px"
                        }}>
                          <i className="fa-solid fa-leaf" style={{ color: "var(--sentiment-pos)", fontSize: "0.75rem" }}></i>
                          <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--sentiment-pos)" }}>
                            {product.sentimentScore}% AI
                          </span>
                        </div>
                      </div>

                      <hr style={{ border: "0", borderTop: "1px solid var(--border)", marginBottom: "1rem" }} />

                      <Link href={`/shop/${product.id}`} className="btn btn-outline" style={{ width: "100%", borderRadius: "10px" }}>
                        Đánh giá Cảm xúc & Mua
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: "center",
                padding: "5rem 2rem",
                backgroundColor: "var(--card)",
                borderRadius: "24px",
                border: "1px solid var(--border)"
              }}>
                <i className="fa-solid fa-folder-open" style={{ fontSize: "3rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}></i>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>Không tìm thấy sản phẩm nào</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Hãy thử xóa bớt các bộ lọc để tìm kiếm thêm sản phẩm thân thiện với môi trường khác nhé.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
