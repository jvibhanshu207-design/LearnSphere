import React, { useState } from "react";
import { initialNotes } from "../../data/notes";
import { Plus, Download } from "lucide-react";
import Button from "../../components/Button";
import "../../styles/pages/Notes.css";

export const Notes = () => {
  const [notes] = useState(initialNotes);

  return (
    <div className="notes-page">
      <div className="notes-header">
        <div>
          <h2 className="notes-title">Instructor Syllabus Notes</h2>
          <p className="notes-desc">
            Review, download, or publish reference materials and cheat sheets.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Upload new PDF reference notes.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Upload Notes
        </Button>
      </div>

      <div className="notes-grid">
        {notes.map((n) => (
          <div key={n.id} className="card note-card">
            <div>
              <span className="badge note-card-badge">
                {n.category}
              </span>
              <h4 className="note-card-title">{n.title}</h4>
            </div>
            <p className="note-card-body">
              {n.content}
            </p>
            <div className="note-card-meta">
              <span style={{ color: "var(--text-light)" }}>Published: {n.date}</span>
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
