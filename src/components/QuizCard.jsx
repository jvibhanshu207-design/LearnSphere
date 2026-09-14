import React from "react";
import { Clock, HelpCircle } from "lucide-react";
import Button from "./Button";

export const QuizCard = ({ quiz, onStart }) => {
  const { title, questionsCount, timeLimit } = quiz;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{title}</h4>
      </div>

      <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <HelpCircle size={16} />
          <span>{questionsCount} Questions</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Clock size={16} />
          <span>{timeLimit} Mins</span>
        </div>
      </div>

      <div style={{ marginTop: "auto", pt: "8px" }}>
        <Button onClick={onStart} variant="primary" style={{ width: "100%" }}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
};
export default QuizCard;
