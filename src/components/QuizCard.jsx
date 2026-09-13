import React from "react";
import { Clock, HelpCircle } from "lucide-react";
import Button from "./Button";
import "../styles/components/QuizCard.css";

export const QuizCard = ({ quiz, onStart }) => {
  const { title, questionsCount, timeLimit } = quiz;

  return (
    <div className="card quiz-card">
      <div className="quiz-card-info">
        <h4 className="quiz-card-title">{title}</h4>
      </div>

      <div className="quiz-card-meta">
        <div className="quiz-card-meta-item">
          <HelpCircle size={16} />
          <span>{questionsCount} Questions</span>
        </div>
        <div className="quiz-card-meta-item">
          <Clock size={16} />
          <span>{timeLimit} Mins</span>
        </div>
      </div>

      <div className="quiz-card-action">
        <Button onClick={onStart} variant="primary" className="quiz-card-btn">
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
