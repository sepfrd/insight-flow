import "../styles/question.css";
import SingleQuestion from "./SingleQuestion";

export function Questions({ questionsList }) {
  return (
    <div className="questions">
      <h1 className="questions-header">Questions</h1>
      {questionsList.map((singleQuestion) => (
        <SingleQuestion
          question={singleQuestion}
          key={singleQuestion.Guid}></SingleQuestion>
      ))}
    </div>
  );
}
