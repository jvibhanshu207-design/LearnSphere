import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import { initialAssignments } from "../../data/assignments";
import { initialAnnouncements } from "../../data/announcements";
import CourseCard from "../../components/CourseCard";
import StatCard from "../../components/StatCard";
import ProgressBar from "../../components/ProgressBar";
import {
  BookOpen,
  CheckCircle,
  FileClock,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Calendar,
  Clock
} from "lucide-react";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Calculate dynamic stats
  const enrolledCount = currentUser?.enrolledCourses?.length || 0;
  const completedCount = currentUser?.completedCourses?.length || 0;
  const pendingAssignments = assignments.filter(a => a.status !== "Completed").length;

  const enrolledCoursesList = courses.filter(c =>
    currentUser?.enrolledCourses?.includes(c.id)
  );

  const overallProgress = enrolledCoursesList.length > 0
    ? Math.round(enrolledCoursesList.reduce((acc, curr) => acc + curr.progress, 0) / enrolledCoursesList.length)
    : 72; // fallback constant requested if none

  const newCourses = courses.filter(c => !currentUser?.enrolledCourses?.includes(c.id)).slice(0, 3);

  const schedule = [
    { title: "Java OOP", type: "Lecture", time: "10:00 AM" },
    { title: "React Hooks", type: "Lecture", time: "1:00 PM" },
    { title: "Web Development", type: "Group Discussion", time: "4:00 PM" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* A. Statistics */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <StatCard icon={BookOpen} value={enrolledCount} label="Total Courses" color="info" />
        <StatCard icon={CheckCircle} value={completedCount} label="Completed" color="success" />
        <StatCard icon={FileClock} value={pendingAssignments} label="Pending Assignments" color="warning" />
        <StatCard icon={TrendingUp} value={`${overallProgress}%`} label="Overall Progress" color="primary" />
      </section>

      {/* Grid Layout for B, C, D, E, F */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", flexGrow: 1 }}>
          
          {/* B. New Courses */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>New Courses</h3>
              <button
                onClick={() => navigate("/student/courses")}
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {newCourses.length > 0 ? (
                newCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    showProgress={false}
                    buttonText="Enroll Now"
                    onView={() => navigate(`/student/courses/${course.id}`)}
                  />
                ))
              ) : (
                <div className="card" style={{ gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "var(--text-secondary)" }}>
                  No new courses available right now. Check back later!
                </div>
              )}
            </div>
          </section>

          {/* C. Learning Activity */}
          <section className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Learning Activity</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--status-completed)", fontWeight: 600 }}>
                  +12% increase from last week
                </p>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Hours Studied / Week</span>
            </div>
            
            {/* CSS Weekly Bar Chart */}
            <div className="bar-chart-container">
              {[
                { day: "Mon", hrs: 2.5, val: 50 },
                { day: "Tue", hrs: 4, val: 80 },
                { day: "Wed", hrs: 1.5, val: 30 },
                { day: "Thu", hrs: 3.5, val: 70 },
                { day: "Fri", hrs: 5, val: 100 },
                { day: "Sat", hrs: 2, val: 40 },
                { day: "Sun", hrs: 3, val: 60 }
              ].map((item, index) => (
                <div key={index} className="chart-bar-col">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar-fill" style={{ height: `${item.val}%` }}>
                      <span className="chart-bar-tooltip">{item.hrs} hrs</span>
                    </div>
                  </div>
                  <span className="chart-bar-label">{item.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* E. Course Progress (Enrolled Courses list) */}
          <section>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px" }}>Courses You're Taking</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {enrolledCoursesList.map(course => (
                <div
                  key={course.id}
                  className="card flex-progress-card"
                  onClick={() => navigate(`/student/courses/${course.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexGrow: 1 }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--border-radius-md)",
                        backgroundColor: "#f5f3ff",
                        color: "var(--navy-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <BookOpen size={24} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{course.title}</h4>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{course.instructor}</span>
                    </div>
                  </div>

                  <div className="progress-card-middle" style={{ display: "flex", alignItems: "center", gap: "24px", flexGrow: 1 }}>
                    <div style={{ flexGrow: 1, minWidth: "120px" }}>
                      <ProgressBar progress={course.progress} showText={true} size="sm" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-secondary)", flexShrink: 0 }}>
                      <Clock size={16} />
                      <span>{course.remainingTime}</span>
                    </div>
                  </div>

                  <ChevronRight size={20} style={{ color: "var(--text-light)" }} />
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column / Sidebar details */}
        <div className="right-panel-col" style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "300px" }}>
          
          {/* D. Daily Schedule */}
          <section className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Daily Schedule</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {schedule.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "var(--border-radius-md)",
                    borderLeft: "4px solid var(--lime-accent)"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>{item.title}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      {item.type} &bull; {item.time}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`Navigating to online class for ${item.title}...`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* F. Assignments */}
          <section className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Assignments</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {assignments.slice(0, 3).map((item) => {
                const getPillColor = () => {
                  if (item.status === "Completed") return "badge-completed";
                  if (item.status === "In Progress") return "badge-progress";
                  return "badge-upcoming";
                };
                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/student/assignments/${item.id}`)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid var(--border-light)",
                      cursor: "pointer"
                    }}
                    className="dashboard-assign-item"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>{item.title}</span>
                      <span className={`badge ${getPillColor()}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                        {item.status}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} />
                      Due: {new Date(item.dueDate).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .dashboard-grid {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .dashboard-grid > div:first-child {
          flex: 2 1 600px;
        }
        .dashboard-grid > .right-panel-col {
          flex: 1 1 300px;
        }
        
        /* Bar Chart Styles */
        .bar-chart-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 160px;
          padding-top: 24px;
        }
        .chart-bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .chart-bar-wrapper {
          height: 100px;
          width: 24px;
          background-color: var(--border-light);
          border-radius: 9999px;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .chart-bar-fill {
          width: 100%;
          background: linear-gradient(to top, var(--navy-dark), var(--lime-accent));
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chart-bar-fill:hover {
          background: var(--lime-accent);
        }
        .chart-bar-tooltip {
          visibility: hidden;
          background-color: var(--navy-dark);
          color: #fff;
          text-align: center;
          padding: 4px 8px;
          border-radius: 6px;
          position: absolute;
          z-index: 10;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .chart-bar-fill:hover .chart-bar-tooltip {
          visibility: visible;
          opacity: 1;
        }
        .chart-bar-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Enrolled Progress card flex */
        .flex-progress-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .flex-progress-card {
            flex-direction: column;
            align-items: start;
            gap: 16px;
          }
          .progress-card-middle {
            width: 100%;
          }
        }
        @media (max-width: 1200px) {
          .dashboard-grid {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
export default Dashboard;
