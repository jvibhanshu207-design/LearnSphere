// import React from "react";
// import "../styles/components/ProgressBar.css";

// export const ProgressBar = ({ progress, showText = true, size = "md", color = "primary" }) => {
//   const roundedProgress = Math.min(Math.max(Math.round(progress), 0), 100);

//   const getFillColorClass = () => {
//     if (color === "primary") return "progress-bar-fill--primary";
//     if (color === "status") {
//       if (roundedProgress >= 80) return "progress-bar-fill--completed";
//       if (roundedProgress >= 40) return "progress-bar-fill--progress";
//       return "progress-bar-fill--upcoming";
//     }
//     return `progress-bar-fill--${color}`;
//   };

//   return (
//     <div className="progress-bar-container">
//       {showText && (
//         <div className="progress-bar-labels">
//           <span className="progress-bar-label">Progress</span>
//           <span className="progress-bar-value">{roundedProgress}%</span>
//         </div>
//       )}
//       <div className={`progress-bar-track progress-bar-track--${size}`}>
//         <div
//           className={`progress-bar-fill ${getFillColorClass()}`}
//           style={{ width: `${roundedProgress}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;


const Progress = () => {
    return (
        <div className="under-construction">
            <div className="construction-icon">🚧</div>
            <h1>Progress</h1>
            <h2>Under Construction</h2>
            <p>
                We're working on this section. It will be available soon!
            </p>
        </div>
    );
};

export default Progress;