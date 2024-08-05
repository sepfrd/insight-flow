import "../styles/question.css";
import { useState, useEffect } from "react";
import { publicQuestionServices } from "../services/questionServices";
import { Questions } from "../components/Questions";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    () => async () => {
      try {
        const fetchedQuestions = await publicQuestionServices.publicGetQuestionsAsync();
        setQuestions(fetchedQuestions.Data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="questions-section">
      <Questions questionsList={questions} />;
    </div>
  );
}
