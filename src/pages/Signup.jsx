import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";

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
              <circle cx="350" cy="150" r="80" fill="rgba(147, 51, 234, 0.1)" filter="blur(20px)" />

              {/* Sphere core representing Learnsphere */}
              <circle cx="250" cy="190" r="70" fill="none" stroke="var(--lime-accent)" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="250" cy="190" r="55" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" />
              <circle cx="250" cy="190" r="30" fill="var(--lime-accent)" />
              <circle cx="250" cy="190" r="12" fill="var(--navy-sidebar)" />

              {/* Orbiting rings */}
              <ellipse cx="250" cy="190" rx="100" ry="30" fill="none" stroke="#a3e635" strokeWidth="3" transform="rotate(-15 250 190)" />
              <ellipse cx="250" cy="190" rx="120" ry="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" transform="rotate(25 250 190)" />

              {/* Little particles/nodes */}
              <circle cx="160" cy="160" r="6" fill="#a3e635" />
              <circle cx="340" cy="220" r="8" fill="#ffffff" />
              <circle cx="290" cy="120" r="5" fill="#a3e635" />
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
            <div
              className="login-error-alert"
              style={{ backgroundColor: "#ecfdf5", border: "1px solid #d1fae5", color: "var(--status-completed)" }}
            >
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
              <div style={{ position: "relative" }}>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "44px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingRight: "44px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center"
                  }}
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
                style={{ appearance: "auto" }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="checkbox-label" style={{ display: "flex", alignItems: "start", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ width: "16px", height: "16px", borderRadius: "4px", marginTop: "2px" }}
                />
                <span style={{ color: "var(--text-secondary)", lineHeight: 1.3 }}>
                  I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions Agreement"); }} style={{ fontWeight: 600, color: "var(--navy-dark)" }}>Terms & Conditions</a>
                </span>
              </label>
            </div>

            <Button type="submit" variant="primary" style={{ width: "100%", padding: "14px" }} disabled={loading}>
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
