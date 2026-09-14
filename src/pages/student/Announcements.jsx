import React, { useState } from "react";
import { initialAnnouncements } from "../../data/announcements";
import AnnouncementCard from "../../components/AnnouncementCard";

export const Announcements = () => {
  const [announcements] = useState(initialAnnouncements);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Announcements</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Stay updated with high priority announcements from your instructors.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {announcements.map((item) => (
          <AnnouncementCard key={item.id} announcement={item} />
        ))}
      </div>
    </div>
  );
};
export default Announcements;
