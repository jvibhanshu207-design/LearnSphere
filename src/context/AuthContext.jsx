import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    email: "student@learnsphere.com",
    password: "password",
    name: "Jane Doe",
    role: "student",
    enrolledCourses: ["java-prog", "react-dev", "python-fund"],
    completedCourses: ["web-dev"]
  },
  {
    email: "teacher@learnsphere.com",
    password: "password",
    name: "Dr. Amit Kumar",
    role: "teacher",
    createdCourses: ["java-prog", "react-dev", "web-dev"]
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("learnsphere_users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    localStorage.setItem("learnsphere_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("learnsphere_current_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // simulate loading state in UI
      setTimeout(() => {
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (user) {
          setCurrentUser(user);
          localStorage.setItem("learnsphere_current_user", JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid email or password. Please try again."));
        }
      }, 800);
    });
  };

  const signup = (name, email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (userExists) {
          reject(new Error("Email already registered."));
          return;
        }

        const newUser = {
          name,
          email: email.toLowerCase(),
          password,
          role,
          enrolledCourses: role === "student" ? ["java-prog", "react-dev"] : [],
          completedCourses: [],
          createdCourses: role === "teacher" ? [] : []
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("learnsphere_users", JSON.stringify(updatedUsers));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("learnsphere_current_user");
  };

  const updateProfile = (name, email, additionalInfo = {}) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      name,
      email: email.toLowerCase(),
      ...additionalInfo
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("learnsphere_current_user", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("learnsphere_users", JSON.stringify(updatedUsers));
  };

  const enrollInCourse = (courseId) => {
    if (!currentUser || currentUser.role !== "student") return;
    
    // Check if already enrolled
    if (currentUser.enrolledCourses.includes(courseId)) return;

    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...currentUser.enrolledCourses, courseId]
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("learnsphere_current_user", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("learnsphere_users", JSON.stringify(updatedUsers));
  };

  const addCreatedCourse = (courseId) => {
    if (!currentUser || currentUser.role !== "teacher") return;

    const updatedUser = {
      ...currentUser,
      createdCourses: [...(currentUser.createdCourses || []), courseId]
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("learnsphere_current_user", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("learnsphere_users", JSON.stringify(updatedUsers));
  };

  const value = {
    currentUser,
    users,
    login,
    signup,
    logout,
    updateProfile,
    enrollInCourse,
    addCreatedCourse,
    isAuthenticated: !!currentUser,
    userRole: currentUser ? currentUser.role : null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
