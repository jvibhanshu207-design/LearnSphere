export const initialCourses = [
  {
    id: "java-prog",
    title: "Java Programming",
    instructor: "Rahul Sharma",
    category: "Programming",
    lessons: 12,
    rating: 4.8,
    progress: 75,
    remainingTime: "8h 45min",
    studentsCount: 1420,
    description: "Learn Java programming from scratch, covering basic syntax, Object-Oriented Programming (OOP) concepts, exception handling, and multithreading.",
    modules: [
      { id: "mod-1", title: "Introduction to Java", completed: true },
      { id: "mod-2", title: "Variables & Data Types", completed: true },
      { id: "mod-3", title: "Object-Oriented Programming (OOP)", completed: true },
      { id: "mod-4", title: "Advanced Concepts & Projects", completed: false }
    ],
    materials: [
      { type: "PDF Notes", name: "Java Fundamentals Quick Guide.pdf" },
      { type: "Video Lectures", name: "Object-Oriented Design Principles" },
      { type: "Practice Questions", name: "Java Control Flows Exercises" }
    ],
    assignmentsList: [
      { id: "assign-java-oop", name: "Java OOP Assignment" },
      { id: "assign-java-practice", name: "Java Practice Questions" }
    ]
  },
  {
    id: "react-dev",
    title: "React Development",
    instructor: "Amit Kumar",
    category: "Web Development",
    lessons: 15,
    rating: 4.9,
    progress: 55,
    remainingTime: "12h 20min",
    studentsCount: 2350,
    description: "Master React.js including Hooks, State Management, Context API, React Router, and building highly performant single page applications.",
    modules: [
      { id: "mod-1", title: "Introduction to React & JSX", completed: true },
      { id: "mod-2", title: "React State & Props", completed: true },
      { id: "mod-3", title: "React Hooks (useState, useEffect)", completed: false },
      { id: "mod-4", title: "Vite, React Router & Context API", completed: false }
    ],
    materials: [
      { type: "PDF Notes", name: "React Components Cheatsheet.pdf" },
      { type: "Video Lectures", name: "State Management Deep Dive" },
      { type: "Practice Questions", name: "Vite Project Setup Practice" }
    ],
    assignmentsList: [
      { id: "assign-react-comp", name: "React Components Layout" }
    ]
  },
  {
    id: "python-fund",
    title: "Python Fundamentals",
    instructor: "Siddharth Verma",
    category: "Programming",
    lessons: 18,
    rating: 4.7,
    progress: 65,
    remainingTime: "6h 15min",
    studentsCount: 1890,
    description: "Start coding with Python. Cover variables, loops, lists, dictionaries, custom functions, and basic object-oriented programming with Python.",
    modules: [
      { id: "mod-1", title: "Python Setup & Syntax", completed: true },
      { id: "mod-2", title: "Control Flow & Loops", completed: true },
      { id: "mod-3", title: "Functions & Standard Libraries", completed: true },
      { id: "mod-4", title: "Object-Oriented Programming in Python", completed: false }
    ],
    materials: [
      { type: "PDF Notes", name: "Python Syntax Reference.pdf" },
      { type: "Video Lectures", name: "Data Structures in Python Explained" },
      { type: "Practice Questions", name: "Loops & Conditions Challenges" }
    ],
    assignmentsList: [
      { id: "assign-python-prac", name: "Python Practice Scripts" }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development Bootcamp",
    instructor: "Amit Kumar",
    category: "Web Development",
    lessons: 22,
    rating: 4.6,
    progress: 30,
    remainingTime: "18h 10min",
    studentsCount: 3100,
    description: "The complete guide to modern web development: HTML5, CSS3, Flexbox, Grid, Responsive Design, and modern Vanilla JavaScript.",
    modules: [
      { id: "mod-1", title: "HTML5 Structure & Semantics", completed: true },
      { id: "mod-2", title: "CSS3 Styling, Transitions & Grid", completed: false },
      { id: "mod-3", title: "Vanilla JavaScript DOM Manipulation", completed: false },
      { id: "mod-4", title: "Responsive Web Design Projects", completed: false }
    ],
    materials: [
      { type: "PDF Notes", name: "CSS Flexbox & Grid Guide.pdf" },
      { type: "Video Lectures", name: "Asynchronous JavaScript & Fetch API" },
      { type: "Practice Questions", name: "Building Responsive Templates" }
    ],
    assignmentsList: []
  }
];
