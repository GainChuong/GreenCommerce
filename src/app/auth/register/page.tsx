"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Password strength checker
function getPasswordStrength(password: string): { score: number; label: string; color: string; checks: { label: string; ok: boolean }[] } {
  const checks = [
    { label: "Ít nhất 8 ký tự", ok: password.length >= 8 },
    { label: "Có chữ hoa (A-Z)", ok: /[A-Z]/.test(password) },
    { label: "Có chữ thường (a-z)", ok: /[a-z]/.test(password) },
    { label: "Có chữ số (0-9)", ok: /[0-9]/.test(password) },
    { label: "Có ký hiệu đặc biệt (!@#...)", ok: /[^A-Za-z0-9]/.test(password) }
  ];
  const score = checks.filter(c => c.ok).length;
  let label = "Rất yếu";
  let color = "#ef4444";
  if (score === 2) { label = "Yếu"; color = "#f97316"; }
  else if (score === 3) { label = "Trung bình"; color = "#eab308"; }
  else if (score === 4) { label = "Mạnh"; color = "#22c55e"; }
  else if (score === 5) { label = "Rất mạnh 🔒"; color = "#16a34a"; }
  return { score, label, color, checks };
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập.";
    if (!email.includes("@")) newErrors.email = "Email phải chứa ký tự @.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ (vd: example@gmail.com).";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    if (strength.score < 5) newErrors.password = "Mật khẩu chưa đủ mạnh — cần đủ 5 tiêu chí bên dưới.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("refashion_users") || "[]");
    const alreadyExists = existing.some((u: { email: string }) => u.email === email);
    if (alreadyExists) {
      setErrors({ email: "Email này đã được đăng ký. Vui lòng đăng nhập." });
      return;
    }
    existing.push({ username, email, phone, password });
    localStorage.setItem("refashion_users", JSON.stringify(existing));
    setSuccessMsg(`🎉 Đăng ký thành công! Chào mừng ${username} đến với ReFashion. Bạn nhận được 100 GreenCoin miễn phí!`);
  };

  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    const success = await loginWithGoogle();
    setGoogleLoading(false);
    if (success) {
      router.push("/");
    } else {
      setErrors({ email: "Đăng ký bằng Google thất bại. Vui lòng thử lại." });
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Tính năng đăng ký bằng ${provider} đang được phát triển.`);
  };

  if (successMsg) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "calc(100vh - 70px)", padding: "2rem", backgroundColor: "var(--background)"
      }}>
        <div style={{
          backgroundColor: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "24px", padding: "4rem", textAlign: "center",
          maxWidth: "500px", boxShadow: "0 20px 50px var(--shadow-lg)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🌿</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--primary)", marginBottom: "1rem" }}>
            Chào mừng bạn!
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>{successMsg}</p>
          <Link href="/auth/login" className="btn btn-primary" style={{ borderRadius: "12px", padding: "0.85rem 2rem" }}>
            Đăng Nhập Ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "calc(100vh - 70px)", padding: "2rem", backgroundColor: "var(--background)"
    }}>
      <div style={{
        width: "1000px",
        maxWidth: "100%",
        backgroundColor: "var(--card)",
        borderRadius: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 50px var(--shadow-lg)"
      }}>

        {/* LEFT COLUMN: FORM */}
        <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto", maxHeight: "90vh" }}>
          <Link href="/" className="logo-brand" style={{ marginBottom: "1.5rem" }}>
            ReFashion<span>Eco</span>
          </Link>

          <h2 style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", color: "var(--primary)", marginBottom: "0.25rem" }}>
            Bắt đầu hành trình!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Đăng ký để trở thành một phần của cộng đồng thời trang bền vững.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: "" })); }}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
                    border: `1px solid ${errors.username ? "#ef4444" : "var(--border)"}`,
                    backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                  }}
                />
                {errors.username && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.username}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email (phải có @)"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
                    border: `1px solid ${errors.email ? "#ef4444" : "var(--border)"}`,
                    backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                  }}
                />
                {errors.email && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.email}</p>}
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "0.75rem" }}>
              <input
                type="tel"
                placeholder="Số điện thoại"
                required
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: "" })); }}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
                  border: `1px solid ${errors.phone ? "#ef4444" : "var(--border)"}`,
                  backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                }}
              />
              {errors.phone && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.phone}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "0.5rem" }}>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })); }}
                  style={{
                    width: "100%", padding: "0.75rem 2.75rem 0.75rem 1rem", borderRadius: "10px",
                    border: `1px solid ${errors.password ? "#ef4444" : "var(--border)"}`,
                    backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)",
                  background: "transparent", border: 0, color: "var(--text-muted)", cursor: "pointer"
                }}>
                  <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>

              {/* Strength bar */}
              {password && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "0.35rem" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        flex: 1, height: "4px", borderRadius: "4px",
                        backgroundColor: i <= strength.score ? strength.color : "var(--border)",
                        transition: "background-color 0.3s ease"
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: strength.color }}>{strength.label}</p>

                  {/* Checklist */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.2rem", marginTop: "0.4rem" }}>
                    {strength.checks.map((chk, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: chk.ok ? "#16a34a" : "var(--text-muted)" }}>
                        <i className={`fa-solid ${chk.ok ? "fa-circle-check" : "fa-circle-xmark"}`} style={{ fontSize: "0.7rem" }}></i>
                        {chk.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "1.25rem" }}>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: "" })); }}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
                  border: `1px solid ${errors.confirmPassword ? "#ef4444" : confirmPassword && password === confirmPassword ? "#22c55e" : "var(--border)"}`,
                  backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                }}
              />
              {confirmPassword && password === confirmPassword && (
                <p style={{ fontSize: "0.75rem", color: "#22c55e", marginTop: "0.25rem" }}>
                  <i className="fa-solid fa-circle-check"></i> Mật khẩu trùng khớp
                </p>
              )}
              {errors.confirmPassword && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>{errors.confirmPassword}</p>}
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", fontSize: "0.95rem" }}>
              Đăng Ký Tài Khoản
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", margin: "1rem 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
            <span style={{ padding: "0 0.5rem" }}>hoặc đăng ký bằng</span>
            <hr style={{ flexGrow: 1, border: 0, borderTop: "1px solid var(--border)" }} />
          </div>

          <div>
            <button
              className="btn btn-outline"
              style={{
                padding: "0.65rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                width: "100%",
                opacity: googleLoading ? 0.7 : 1,
                cursor: googleLoading ? "not-allowed" : "pointer"
              }}
              onClick={handleGoogleRegister}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...</>
              ) : (
                <><i className="fa-brands fa-google" style={{ color: "#EA4335" }}></i> Đăng ký bằng Google</>
              )}
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
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem", color: "white" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            backgroundImage: "linear-gradient(to top, rgba(15, 81, 50, 0.9) 20%, rgba(15, 81, 50, 0.3) 100%), url('https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800')",
            backgroundSize: "cover", backgroundPosition: "center", zIndex: 0
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>Tham gia với chúng tôi</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", marginBottom: "0.75rem", lineHeight: "1.3" }}>
              Tích Lũy GreenCoin Khi Mua Sắm Xanh
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Nhận ngay 100 GreenCoin miễn phí khi đăng ký tài khoản thành công hôm nay để bắt đầu tham gia các hoạt động trồng rừng bảo vệ Trái Đất.
            </p>

            {/* Password requirements hint */}
            <div style={{
              marginTop: "2rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "1rem",
              backdropFilter: "blur(4px)"
            }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem", opacity: 0.95 }}>
                <i className="fa-solid fa-shield-halved"></i> Yêu cầu mật khẩu:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {["Ít nhất 8 ký tự", "Có chữ hoa (A-Z)", "Có chữ thường (a-z)", "Có chữ số (0-9)", "Có ký hiệu đặc biệt (!@#...)"].map((req, i) => (
                  <li key={i} style={{ fontSize: "0.8rem", opacity: 0.85, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <i className="fa-solid fa-check" style={{ fontSize: "0.65rem", color: "var(--accent)" }}></i> {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
