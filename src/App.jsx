import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentCourseDetails from "./pages/student/CourseDetails";
import StudentAssignments from "./pages/student/Assignments";
// import StudentAssignmentDetails from "./pages/student/AssignmentDetails";
import StudentQuizzes from "./pages/student/Quizzes";
import StudentNotes from "./pages/student/Notes";
import StudentAnnouncements from "./pages/student/Announcements";
import StudentProgress from "./pages/student/Progress";
import StudentProfile from "./pages/student/Profile";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherCreateCourse from "./pages/teacher/CreateCourse";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherNotes from "./pages/teacher/Notes";
import TeacherAnnouncements from "./pages/teacher/Announcements";
import TeacherStudents from "./pages/teacher/Students";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/404" element={<NotFound />} />

          {/* Student Protected Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="courses/:courseId" element={<StudentCourseDetails />} />
            <Route path="assignments" element={<StudentAssignments />} />
            {/* <Route path="assignments/:assignmentId" element={<StudentAssignmentDetails />} /> */}
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="announcements" element={<StudentAnnouncements />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* Teacher Protected Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/create" element={<TeacherCreateCourse />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="notes" element={<TeacherNotes />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
            <Route path="students" element={<TeacherStudents />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
