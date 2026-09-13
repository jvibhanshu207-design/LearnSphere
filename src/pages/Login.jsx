import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Button from "../components/Button";
import "../styles/pages/Auth.css";

export const Login = () => {
  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  // Focus email input on load
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(currentUser.role === "teacher" ? "/teacher" : "/student", { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (rememberMe) {
        localStorage.setItem("learnsphere_remembered_email", email);
      } else {
        localStorage.removeItem("learnsphere_remembered_email");
      }
      navigate(user.role === "teacher" ? "/teacher" : "/student", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("learnsphere_remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-page-wrapper">
      {/* LEFT SIDE: Brand Showcase & Vector Illustration */}
      <div className="login-left">
        <div className="login-brand-content">
          <div className="brand-header">
            <div className="brand-logo-circle">
              <div className="brand-logo-inner" />
            </div>
            <span className="brand-title">LearnSphere</span>
          </div>

          <h1 className="brand-tagline">Learn. Grow. Achieve.</h1>
          <p className="brand-desc">
            Your premium gate to world-class learning and academic advancement. Master coding, design, and programming with structured guidance.
          </p>

          {/* Premium Vector SVG Illustration */}
          <div className="illustration-container">
            <svg viewBox="0 0 500 400" width="100%" height="100%">
              {/* Grid / dots */}
              <defs>
                <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" rx="24" />

              {/* Floating glowing elements */}
              <circle cx="250" cy="200" r="120" fill="rgba(163, 230, 53, 0.08)" filter="blur(20px)" />
              <circle cx="150" cy="150" r="80" fill="rgba(147, 51, 234, 0.1)" filter="blur(20px)" />

              {/* Laptop/Screen Base */}
              <rect x="130" y="260" width="240" height="12" rx="6" fill="#1e293b" />
              <rect x="110" y="272" width="280" height="8" rx="4" fill="#334155" />

              {/* Monitor Screen */}
              <rect x="150" y="120" width="200" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="4" />

              {/* Graphic charts inside monitor */}
              <rect x="170" y="140" width="160" height="12" rx="4" fill="rgba(255,255,255,0.1)" />
              <rect x="170" y="160" width="80" height="8" rx="3" fill="var(--lime-accent)" />
              
              {/* Dynamic activity lines */}
              <path d="M 170 230 L 220 200 L 270 220 L 320 180" fill="none" stroke="var(--lime-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="320" cy="180" r="5" fill="#ffffff" />
              
              {/* Circular progress indicators */}
              <circle cx="300" cy="155" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle cx="300" cy="155" r="15" fill="none" stroke="#a3e635" strokeWidth="4" strokeDasharray="94" strokeDashoffset="30" />

              {/* Floating icons */}
              <g transform="translate(90, 110)" className="floating-elem-1">
                <rect width="50" height="50" rx="12" fill="#1e1b4b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <path d="M 17 25 L 33 25" stroke="#a3e635" strokeWidth="2" />
                <path d="M 25 17 L 25 33" stroke="#a3e635" strokeWidth="2" />
              </g>

              <g transform="translate(360, 200)" className="floating-elem-2">
                <rect width="50" height="50" rx="12" fill="#1e1b4b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="25" cy="25" r="10" fill="none" stroke="#a3e635" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="login-right">
        <div className="login-card-container">
          <div className="login-header">
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">
              Welcome back! Access your courses and assignments.
            </p>
          </div>

          {error && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email</label>
              <input
                ref={emailInputRef}
                id="login-email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">Password</label>
              <div className="input-with-icon">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox-input"
                />
                <span style={{ color: "var(--text-secondary)" }}>Remember me</span>
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo Password Reset: If you forget your password, default is 'password'.");
                }}
                className="forgot-pass"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="btn-full-width"
            onClick={() => {
              alert("Google login is simulated. Please use standard email/password logs.");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fillRule="evenodd" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </Button>

          <p className="signup-footer-text">
            Don't have an account? <Link to="/signup" className="register-link">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
