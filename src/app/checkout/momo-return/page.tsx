"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MoMoReturnContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const transId = searchParams.get("transId");
  const message = searchParams.get("message");

  useEffect(() => {
    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [resultCode]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "1rem" }}></i>
          <p style={{ color: "var(--text-muted)" }}>Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 70px)", padding: "2rem" }}>
      <div className="animate-fade-in-up" style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "28px",
        padding: "3.5rem",
        textAlign: "center",
        maxWidth: "600px",
        boxShadow: "0 20px 50px var(--shadow-lg)"
      }}>
        {/* Icon */}
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          backgroundColor: status === "success" ? "var(--sentiment-pos-light)" : "#fef2f2",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem auto"
        }}>
          <i className={`fa-solid ${status === "success" ? "fa-check" : "fa-xmark"}`}
            style={{ fontSize: "2.5rem", color: status === "success" ? "var(--sentiment-pos)" : "#ef4444" }}
          ></i>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: status === "success" ? "var(--primary)" : "#ef4444", marginBottom: "0.75rem" }}>
          {status === "success" ? "Thanh Toán Thành Công! 🎉" : "Thanh Toán Thất Bại"}
        </h2>

        {/* Info */}
        {status === "success" ? (
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Đơn hàng <strong style={{ color: "var(--primary)" }}>#{orderId}</strong> đã được thanh toán qua MoMo.
            </p>

            <div style={{ backgroundColor: "var(--primary-light)", borderRadius: "16px", padding: "1.25rem", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Mã giao dịch MoMo</span>
                <span style={{ fontWeight: "700", color: "var(--primary)" }}>{transId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Số tiền</span>
                <span style={{ fontWeight: "700", color: "var(--accent)" }}>
                  {amount ? Number(amount).toLocaleString("vi-VN") : "—"} đ
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
              {message || "Giao dịch không thành công. Vui lòng thử lại."}
            </p>
            {orderId && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Mã đơn: <strong>{orderId}</strong>
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {status === "success" ? (
            <>
              <Link href="/profile#orders" className="btn btn-primary" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
                Xem Đơn Hàng
              </Link>
              <Link href="/shop" className="btn btn-outline" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
                Tiếp Tục Mua Sắm
              </Link>
            </>
          ) : (
            <>
              <Link href="/checkout" className="btn btn-primary" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
                Thử Lại
              </Link>
              <Link href="/shop" className="btn btn-outline" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
                Quay Lại
              </Link>
            </>
          )}
        </div>

        {/* MoMo badge */}
        <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <i className="fa-solid fa-wallet" style={{ color: "#a50064" }}></i>
          Thanh toán qua Ví MoMo (Sandbox Test)
        </div>
      </div>
    </div>
  );
}

export default function MoMoReturnPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Đang tải...</p>
      </div>
    }>
      <MoMoReturnContent />
    </Suspense>
  );
}
