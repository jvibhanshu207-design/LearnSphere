import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import "../styles/pages/Auth.css";

export const Signup = () => {
  const { signup, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(currentUser.role === "teacher" ? "/teacher" : "/student", { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password, role);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-brand-content">
          <div className="brand-header">
            <div className="brand-logo-circle">
              <div className="brand-logo-inner" />
            </div>
            <span className="brand-title">LearnSphere</span>
          </div>

          <h1 className="brand-tagline">Start Your Journey Today.</h1>
          <p className="brand-desc">
            Sign up to access custom learning schedules, interact with top-class courses, take quizzes, and track your study milestones.
          </p>

          <div className="illustration-container">
            <svg viewBox="0 0 500 400" width="100%" height="100%">
              <defs>
                <pattern id="dotPattern2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern2)" rx="24" />

              <circle cx="250" cy="200" r="120" fill="rgba(163, 230, 53, 0.08)" filter="blur(20px)" />
              <circle cx="350" cy="250" r="80" fill="rgba(147, 51, 234, 0.1)" filter="blur(20px)" />

              <rect x="120" y="100" width="260" height="180" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="4" />
              
              <rect x="140" y="120" width="120" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
              <rect x="140" y="145" width="220" height="1" fill="#334155" />

              <rect x="140" y="160" width="100" height="30" rx="6" fill="#1e293b" />
              <rect x="250" y="160" width="110" height="30" rx="6" fill="#1e293b" />
              <rect x="140" y="200" width="220" height="60" rx="6" fill="#1e293b" />

              <g transform="translate(70, 220)" className="floating-elem-1">
                <rect width="50" height="50" rx="12" fill="#1e1b4b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <path d="M 20 25 L 30 25 M 25 20 L 25 30" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              <g transform="translate(380, 80)" className="floating-elem-2">
                <circle cx="25" cy="25" r="25" fill="#1e1b4b" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="25" cy="25" r="12" fill="none" stroke="#a3e635" strokeWidth="3" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card-container">
          <div className="login-header">
            <h2 className="login-title">Create Your Account</h2>
            <p className="login-subtitle">Start your learning journey today.</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="login-success-alert">
              <CheckCircle2 size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">Full Name</label>
              <input
                id="signup-name"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Email</label>
              <input
                id="signup-email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <div className="input-with-icon">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Create password"
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

            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-eye-btn"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-role" className="form-label">Role</label>
              <select
                id="signup-role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="auth-checkbox-input"
                />
                <span style={{ color: "var(--text-secondary)", lineHeight: 1.3 }}>
                  I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions Agreement"); }} style={{ fontWeight: 600, color: "var(--navy-dark)" }}>Terms & Conditions</a>
                </span>
              </label>
            </div>

            <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="signup-footer-text">
            Already have an account? <Link to="/login" className="register-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
