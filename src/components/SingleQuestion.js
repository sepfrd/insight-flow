import { useContext, useState } from "react";
import "../styles/question.css";
import { AuthContext } from "../contexts/AuthContext";

export default function SingleQuestion({ question }) {
  const [isAnswerSectionShown, setIsAnswerSectionShown] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated = !!userInfo;

  return (
    <div className="single-question">
      <div className="question-title">{question.Title}</div>
      <div className="question-description">{question.Description}</div>
      <div className="question-buttons">
        <button
          className="submit-answer-button"
          onClick={() => setIsAnswerSectionShown((previousState) => !previousState)}>
          {isAnswerSectionShown ? "Hide" : "Show"} answers
        </button>
        <button
          disabled={!isAuthenticated}
          className="submit-answer-button"
          onClick={handleSubmitAnswerButton}>
          Submit answer
        </button>
      </div>
    </div>
  );
}

function handleSubmitAnswerButton(event) {
  console.log("Handling submit answer button ...");
}
