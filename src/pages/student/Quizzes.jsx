import React, { useState } from "react";
import { initialQuizzes } from "../../data/quizzes";
import QuizCard from "../../components/QuizCard";
import Button from "../../components/Button";
import { HelpCircle, Clock, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, AlertTriangle } from "lucide-react";

export const Quizzes = () => {
  const [quizzes] = useState(initialQuizzes);

  // States for running quiz
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setScore(0);
  };

  const handleSelectOption = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizFinished(true);

    // Persist quiz scores to LocalStorage (optional progress tracking sync)
    const storedScores = JSON.parse(localStorage.getItem("learnsphere_quiz_scores") || "{}");
    storedScores[activeQuiz.id] = {
      score: correctCount,
      total: activeQuiz.questions.length,
      percentage: Math.round((correctCount / activeQuiz.questions.length) * 100)
    };
    localStorage.setItem("learnsphere_quiz_scores", JSON.stringify(storedScores));
  };

  const handleTryAgain = () => {
    handleStartQuiz(activeQuiz);
  };

  const handleExitQuiz = () => {
    setActiveQuiz(null);
    setQuizFinished(false);
  };

  // If a quiz is currently active
  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestionIndex];
    const totalQuestions = activeQuiz.questions.length;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ maxWidth: "600px", width: "100%", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{activeQuiz.title}</h3>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            {!quizFinished && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--status-upcoming)", fontWeight: 700 }}>
                <Clock size={16} />
                <span>Simulated Timer</span>
              </div>
            )}
          </div>

          {/* Quiz running view */}
          {!quizFinished ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Question Text */}
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}>
                {question.question}
              </h4>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {question.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i); // A, B, C, D
                  const isSelected = selectedAnswers[currentQuestionIndex] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px",
                        borderRadius: "var(--border-radius-md)",
                        border: isSelected ? "2px solid var(--navy-dark)" : "1px solid var(--border-light)",
                        backgroundColor: isSelected ? "rgba(163, 230, 53, 0.15)" : "#f8fafc",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        transition: "var(--transition-smooth)"
                      }}
                      className="quiz-option-button"
                    >
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: isSelected ? "var(--navy-dark)" : "#ffffff",
                          color: isSelected ? "#ffffff" : "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem",
                          border: isSelected ? "none" : "1px solid var(--border-light)"
                        }}
                      >
                        {letter}
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  disabled={currentQuestionIndex === 0}
                  style={{ gap: "6px" }}
                >
                  <ChevronLeft size={16} /> Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmitQuiz}
                    variant="primary"
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="secondary"
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    style={{ gap: "6px" }}
                  >
                    Next <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#ecfdf5",
                  color: "var(--status-completed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CheckCircle2 size={40} />
              </div>

              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Quiz Completed 🎉</h3>
                <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>
                  Let's check how well you mastered this lesson.
                </p>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "16px 32px", borderRadius: "var(--border-radius-lg)", border: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {score} / {totalQuestions}
                </span>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "4px" }}>
                  Percentage: {Math.round((score / totalQuestions) * 100)}%
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "12px" }}>
                <Button onClick={handleTryAgain} variant="outline" style={{ flex: 1, gap: "8px" }}>
                  <RotateCcw size={16} /> Try Again
                </Button>
                <Button onClick={handleExitQuiz} variant="primary" style={{ flex: 1 }}>
                  Finish
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // Quiz list selection
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Interactive Quizzes</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Validate your knowledge, earn points, and complete course modules.
        </p>
      </div>

      {/* Grid List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStart={() => handleStartQuiz(quiz)}
          />
        ))}
      </div>
    </div>
  );
};
export default Quizzes;
