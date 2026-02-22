import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

type LoginState = "idle" | "loading" | "error" | "success";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("All fields are required.");
      setLoginState("error");
      return;
    }
    setLoginState("loading");
    setErrorMsg("");

    // Replace with your real API call
    await new Promise((res) => setTimeout(res, 1500));

    if (username === "admin" && password === "admin123") {
      setLoginState("success");
      navigate("/dashboard");
    } else {
      setLoginState("error");
      setErrorMsg("Invalid username or password.");
    }
  };

  const isLoading = loginState === "loading";
  const isError = loginState === "error";
  const isSuccess = loginState === "success";

  return (
    <div className="lp-root">
      <div className={`lp-card${mounted ? " lp-card-visible" : ""}`}>
        {/* Logo */}
        <div className="lp-logo">
          <span className="lp-logo-i">i</span>
          <span className="lp-logo-tmo">TMO</span>
          <div className="lp-logo-dot" />
        </div>

        <h1 className="lp-title">Welcome back</h1>
        <p className="lp-sub">Sign in to your admin account</p>

        {isSuccess ? (
          <div className="lp-success">
            <div className="lp-success-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <path
                  d="M12 20 L17 25 L28 14"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="lp-success-title">Access Granted</p>
            <p className="lp-success-sub">Redirecting to dashboard...</p>
            <div className="lp-progress">
              <div className="lp-progress-fill" />
            </div>
          </div>
        ) : (
          <form className="lp-form" onSubmit={handleSubmit} noValidate>
            <div className="lp-field">
              <label className="lp-label" htmlFor="username">
                Username
              </label>
              <div className={`lp-input-wrap${isError ? " lp-input-err" : ""}`}>
                <svg
                  className="lp-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="5.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M2.5 13.5C2.5 11 5 9 8 9C11 9 13.5 11 13.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="username"
                  type="text"
                  className="lp-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLoginState("idle");
                  }}
                  disabled={isLoading}
                  autoComplete="username"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="lp-field">
              <label className="lp-label" htmlFor="password">
                Password
              </label>
              <div className={`lp-input-wrap${isError ? " lp-input-err" : ""}`}>
                <svg
                  className="lp-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M5.5 7V5a2.5 2.5 0 015 0v2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="10.5" r="1" fill="currentColor" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="lp-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginState("idle");
                  }}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <line
                        x1="2"
                        y1="14"
                        x2="14"
                        y2="2"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="lp-row">
              <label className="lp-remember">
                <input type="checkbox" className="lp-checkbox" />
                <span className="lp-check-box" />
                Remember me
              </label>
              <button type="button" className="lp-forgot">
                Forgot password?
              </button>
            </div>

            {isError && errorMsg && (
              <div className="lp-error">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="7"
                    y1="4"
                    x2="7"
                    y2="7.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="7" cy="10" r="0.7" fill="currentColor" />
                </svg>
                {errorMsg}
              </div>
            )}

            <button type="submit" className="lp-submit" disabled={isLoading}>
              {isLoading ? (
                <span className="lp-loading">
                  <span className="lp-spinner" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        <p className="lp-footer">
          © 2026 iTMO Systems · All access is monitored
        </p>
      </div>
    </div>
  );
}
