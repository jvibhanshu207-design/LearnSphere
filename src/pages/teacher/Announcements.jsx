import React, { useState } from "react";
import { initialAnnouncements } from "../../data/announcements";
import { Plus } from "lucide-react";
import Button from "../../components/Button";
import AnnouncementCard from "../../components/AnnouncementCard";

export const Announcements = () => {
  const [announcements] = useState(initialAnnouncements);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Instructor Announcements</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Publish alerts and milestones updates to enrolled students.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Create announcement form.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> New Announcement
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {announcements.map((ann) => (
          <AnnouncementCard key={ann.id} announcement={ann} />
        ))}
      </div>
    </div>
  );
};
export default Announcements;
