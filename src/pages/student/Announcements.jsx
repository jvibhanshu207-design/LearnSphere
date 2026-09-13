// import React, { useState } from "react";
// import { initialAnnouncements } from "../../data/announcements";
// import AnnouncementCard from "../../components/AnnouncementCard";
// import "../../styles/pages/Announcements.css";

// export const Announcements = () => {
//   const [announcements] = useState(initialAnnouncements);

//   return (
//     <div className="announcements-page">
//       {/* Header */}
//       <div>
//         <h2 className="announcements-title">Announcements</h2>
//         <p className="announcements-desc">
//           Stay updated with high priority announcements from your instructors.
//         </p>
//       </div>

//       {/* Grid */}
//       <div className="announcements-list">
//         {announcements.map((item) => (
//           <AnnouncementCard key={item.id} announcement={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Announcements;


const Announcements = () => {
    return (
        <div className="under-construction">
            <div className="construction-icon">🚧</div>
            <h1>Announcements</h1>
            <h2>Under Construction</h2>
            <p>
                We're working on this section. It will be available soon!
            </p>
        </div>
    );
};

export default Announcements;