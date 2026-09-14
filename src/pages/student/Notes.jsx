import React, { useState, useMemo } from "react";
import { initialNotes } from "../../data/notes";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { FileText, Download, Calendar, Search, ExternalLink } from "lucide-react";

export const Notes = () => {
  const [notes] = useState(initialNotes);

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNote, setSelectedNote] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(notes.map(n => n.category));
    return ["all", ...Array.from(cats)];
  }, [notes]);

  // Filter notes dynamically (useMemo / search filter checks)
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        n.content.toLowerCase().includes(searchVal.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" || n.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notes, searchVal, selectedCategory]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Study Notes</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Access, download, and review quick reference cheat sheets and notes.
        </p>
      </div>

      {/* Filter panel */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "16px 24px"
        }}
      >
        <SearchBar
          value={searchVal}
          onChange={setSearchVal}
          placeholder="Search notes, tags, or concepts..."
        />

        <div style={{ width: "100%", maxWidth: "200px" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
            style={{ padding: "8px 12px", height: "42px" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Subjects" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--border-radius-md)",
                  backgroundColor: "#ecfdf5",
                  color: "var(--status-completed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <FileText size={20} />
              </div>
              <div>
                <span className="badge" style={{ backgroundColor: "#f1f5f9", color: "var(--text-secondary)", fontSize: "0.65rem", padding: "2px 8px" }}>
                  {note.category}
                </span>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{note.title}</h4>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4, flexGrow: 1 }}>
              {note.content.substring(0, 100)}...
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={14} />
                {note.date}
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <Button onClick={() => setSelectedNote(note)} variant="outline" style={{ flex: 1, padding: "8px" }}>
                View Notes
              </Button>
              <Button
                onClick={() => alert(`Downloading files for: ${note.title}`)}
                variant="primary"
                style={{ padding: "8px 12px" }}
              >
                <Download size={16} />
              </Button>
            </div>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="card" style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px", color: "var(--text-secondary)" }}>
            No study notes found matching your search.
          </div>
        )}
      </div>

      {/* Note view modal */}
      {selectedNote && (
        <Modal
          isOpen={!!selectedNote}
          onClose={() => setSelectedNote(null)}
          title={selectedNote.title}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span className="badge" style={{ alignSelf: "start", backgroundColor: "#f3e8ff", color: "var(--text-primary)" }}>
              {selectedNote.category}
            </span>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              {selectedNote.content}
            </p>
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>Last updated: {selectedNote.date}</span>
              <Button onClick={() => { alert(`Downloading notes standard PDF...`); setSelectedNote(null); }} variant="primary" style={{ gap: "8px" }}>
                <Download size={16} /> Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Notes;
