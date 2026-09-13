import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import { initialAssignments } from "../../data/assignments";
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
import "../../styles/pages/Dashboard.css";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [courses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [assignments] = useState(() => {
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
    <div className="dashboard-container">
      {/* A. Statistics */}
      <section className="dash-stats-row">
        <StatCard icon={BookOpen} value={enrolledCount} label="Total Courses" color="info" />
        <StatCard icon={CheckCircle} value={completedCount} label="Completed" color="success" />
        <StatCard icon={FileClock} value={pendingAssignments} label="Pending Assignments" color="warning" />
        <StatCard icon={TrendingUp} value={`${overallProgress}%`} label="Overall Progress" color="primary" />
      </section>

      {/* Grid Layout for B, C, D, E, F */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dash-main-col">
          
          {/* B. New Courses */}
          <section>
            <div className="dash-section-header">
              <h3 className="dash-section-title">New Courses</h3>
              <button
                onClick={() => navigate("/student/courses")}
                className="dash-section-action"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="dash-cards-grid">
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
                <div className="card dash-empty-card">
                  No new courses available right now. Check back later!
                </div>
              )}
            </div>
          </section>

          {/* C. Learning Activity */}
          <section className="card dash-chart-card">
            <div className="dash-chart-header">
              <div>
                <h3 className="dash-chart-title">Learning Activity</h3>
                <p className="dash-chart-subtitle">
                  +12% increase from last week
                </p>
              </div>
              <span className="dash-chart-meta">Hours Studied / Week</span>
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
            <h3 className="dash-section-title" style={{ marginBottom: "16px" }}>Courses You're Taking</h3>
            <div className="enrolled-courses-list">
              {enrolledCoursesList.map(course => (
                <div
                  key={course.id}
                  className="card flex-progress-card"
                  onClick={() => navigate(`/student/courses/${course.id}`)}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexGrow: 1 }}>
                    <div className="enrolled-course-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="progress-card-info">
                      <h4 className="progress-card-title">{course.title}</h4>
                      <span className="progress-card-category">{course.instructor}</span>
                    </div>
                  </div>

                  <div className="progress-card-middle">
                    <div className="progress-card-bar-wrap">
                      <ProgressBar progress={course.progress} showText={true} size="sm" />
                    </div>
                    <div className="progress-card-time">
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
        <div className="dash-side-col">
          
          {/* D. Daily Schedule */}
          <section className="card">
            <h3 className="dash-section-title" style={{ marginBottom: "16px" }}>Daily Schedule</h3>
            <div className="dash-schedule-list">
              {schedule.map((item, i) => (
                <div key={i} className="dash-schedule-item">
                  <div className="dash-schedule-info">
                    <span className="dash-schedule-title">{item.title}</span>
                    <span className="dash-schedule-type">
                      {item.type} &bull; {item.time}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`Navigating to online class for ${item.title}...`)}
                    className="dash-schedule-btn"
                    aria-label={`Join class for ${item.title}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* F. Assignments */}
          <section className="card">
            <h3 className="dash-section-title" style={{ marginBottom: "16px" }}>Assignments</h3>
            <div className="dash-assignments-list">
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
                    className="dashboard-assign-item"
                  >
                    <div className="dashboard-assign-header">
                      <span className="dashboard-assign-title">{item.title}</span>
                      <span className={`badge ${getPillColor()}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="dashboard-assign-footer">
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={12} /> {item.dueDate}
                      </span>
                      <span>{item.points} Points</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
