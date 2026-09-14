import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initialAssignments } from "../../data/assignments";
import Button from "../../components/Button";
import { ArrowLeft, Calendar, FileText, UploadCloud, AlertCircle } from "lucide-react";

export const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const assignment = assignments.find((a) => a.id === assignmentId);

  const [submissionText, setSubmissionText] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!assignment) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <h3>Assignment not found</h3>
        <Button onClick={() => navigate("/student/assignments")} style={{ marginTop: "16px" }}>
          Back to Assignments
        </Button>
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!submissionText && !fileName) {
      setError("Please write some submission notes or select a file to upload.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      // Update assignment status to completed
      const updatedAssignments = assignments.map((a) => {
        if (a.id === assignment.id) {
          return { ...a, status: "Completed" };
        }
        return a;
      });

      setAssignments(updatedAssignments);
      localStorage.setItem("learnsphere_assignments", JSON.stringify(updatedAssignments));

      setSubmitting(false);
      setSuccess("Your assignment has been submitted successfully! Status changed to Completed.");
      setSubmissionText("");
      setFileName("");
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Back link */}
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text-secondary)"
          }}
        >
          <ArrowLeft size={16} /> Back to Assignments
        </button>
      </div>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {/* Left Column: Details & Instructions */}
        <div style={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  {assignment.courseName}
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{assignment.title}</h2>
              </div>
              <span
                className={`badge ${
                  assignment.status === "Completed"
                    ? "badge-completed"
                    : assignment.status === "In Progress"
                    ? "badge-progress"
                    : "badge-upcoming"
                }`}
              >
                {assignment.status}
              </span>
            </div>

            <div style={{ display: "flex", gap: "20px", fontSize: "0.85rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={16} />
                Due: {new Date(assignment.dueDate).toLocaleString()}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FileText size={16} />
                Points: {assignment.points}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>Instructions</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {assignment.instructions}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div style={{ flex: "1 1 300px" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Submit Work</h3>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--border-radius-sm)",
                  backgroundColor: "#fef2f2",
                  color: "var(--status-overdue)",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--border-radius-sm)",
                  backgroundColor: "#ecfdf5",
                  color: "var(--status-completed)",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <AlertCircle size={16} />
                <span>{success}</span>
              </div>
            )}

            {assignment.status === "Completed" ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <CheckIconCircle />
                <p style={{ fontWeight: 600, color: "var(--status-completed)", marginTop: "12px" }}>
                  Completed and Submitted!
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Your instructor will review and grade your work.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="submission-notes" className="form-label">Submission Notes</label>
                  <textarea
                    id="submission-notes"
                    rows="4"
                    className="form-control"
                    placeholder="Write details, comments, or host links..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Attach File</label>
                  <div
                    style={{
                      border: "2px dashed var(--border-light)",
                      borderRadius: "var(--border-radius-md)",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: "#f8fafc",
                      position: "relative",
                      cursor: "pointer"
                    }}
                  >
                    <UploadCloud size={24} style={{ color: "var(--text-secondary)", marginBottom: "8px" }} />
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                      {fileName ? `Selected: ${fileName}` : "Click to select or drop a file"}
                    </p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" style={{ width: "100%" }} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Assignment"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIconCircle = () => (
  <div
    style={{
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      backgroundColor: "#ecfdf5",
      color: "var(--status-completed)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

export default AssignmentDetails;
