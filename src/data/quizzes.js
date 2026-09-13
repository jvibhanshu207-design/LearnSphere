export const initialQuizzes = [
  {
    id: "java-oop-quiz",
    title: "Java OOP Quiz",
    courseId: "java-prog",
    questionsCount: 5,
    timeLimit: 10, // minutes
    questions: [
      {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "import"],
        correctAnswer: "extends"
      },
      {
        question: "What is polymorphism in Java?",
        options: [
          "Ability of an object to take on many forms",
          "Creating multiple instances of a class",
          "Preventing modification of a class variable",
          "None of the above"
        ],
        correctAnswer: "Ability of an object to take on many forms"
      },
      {
        question: "Which of these is not an access modifier in Java?",
        options: ["public", "private", "protected", "internal"],
        correctAnswer: "internal"
      },
      {
        question: "What does JVM stand for?",
        options: [
          "Java Virtual Machine",
          "Java Visual Manager",
          "Java Vector Machine",
          "Java Variable Module"
        ],
        correctAnswer: "Java Virtual Machine"
      },
      {
        question: "Which method is the starting point for any Java program?",
        options: ["start()", "init()", "main()", "run()"],
        correctAnswer: "main()"
      }
    ]
  },
  {
    id: "react-basics-quiz",
    title: "React Basics Quiz",
    courseId: "react-dev",
    questionsCount: 4,
    timeLimit: 15, // minutes
    questions: [
      {
        question: "What is JSX?",
        options: ["Java XML", "JavaScript XML", "JSON XML", "Java Syntax Extension"],
        correctAnswer: "JavaScript XML"
      },
      {
        question: "Which React hook is used to handle side effects?",
        options: ["useState", "useContext", "useEffect", "useReducer"],
        correctAnswer: "useEffect"
      },
      {
        question: "How do you pass data to a child component?",
        options: ["Using state", "Using props", "Using functions", "Using references"],
        correctAnswer: "Using props"
      },
      {
        question: "What is the correct command to start a local development server for Vite?",
        options: ["npm run build", "npm run dev", "npm start", "vite build"],
        correctAnswer: "npm run dev"
      }
    ]
  }
];
