import "../styles/question.css";

export default function SingleQuestion({ question }) {
  return (
    <div className="single-question">
      <div className="question-title">{question.Title}</div>
      <div className="question-description">{question.Description}</div>
      <button
        className="answer-button"
        onClick={handleAnswerButton}>
        Submit Answer
      </button>
    </div>
  );
}

function handleAnswerButton(event) {
  console.log("Handling answer button ...");
}
