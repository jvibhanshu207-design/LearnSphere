import React, { useState } from "react";
import { initialNotes } from "../../data/notes";
import { Plus, Download } from "lucide-react";
import Button from "../../components/Button";

export const Notes = () => {
  const [notes] = useState(initialNotes);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Instructor Syllabus Notes</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Review, download, or publish reference materials and cheat sheets.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Upload new PDF reference notes.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Upload Notes
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {notes.map((n) => (
          <div key={n.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span className="badge" style={{ backgroundColor: "#f1f5f9", color: "var(--text-secondary)", fontSize: "0.65rem" }}>
                {n.category}
              </span>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "6px" }}>{n.title}</h4>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4, flexGrow: 1 }}>
              {n.content}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-light)" }}>
              <span>Published: {n.date}</span>
              <Button onClick={() => alert(`Downloading: ${n.title}`)} variant="outline" style={{ padding: "6px" }}>
                <Download size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;
