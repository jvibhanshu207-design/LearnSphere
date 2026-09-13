import React, { useState } from "react";
import { initialAnnouncements } from "../../data/announcements";
import { Plus } from "lucide-react";
import Button from "../../components/Button";
import AnnouncementCard from "../../components/AnnouncementCard";
import "../../styles/pages/Announcements.css";

export const Announcements = () => {
  const [announcements] = useState(initialAnnouncements);

  return (
    <div className="announcements-page">
      <div className="announcements-header">
        <div>
          <h2 className="announcements-title">Instructor Announcements</h2>
          <p className="announcements-desc">
            Publish alerts and milestones updates to enrolled students.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Create announcement form.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> New Announcement
        </Button>
      </div>

      <div className="announcements-list">
        {announcements.map((ann) => (
          <AnnouncementCard key={ann.id} announcement={ann} />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
