import "../styles/question.css";
import { useState, useEffect, useContext } from "react";
import { publicQuestionServices } from "../api/questionServices";
import { Questions } from "../components/Questions";
import { AuthContext } from "../contexts/AuthContext";
import { KEYS_VALUES } from "../utils/constants";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { onLogout } = useContext(AuthContext);

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

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem(KEYS_VALUES.authTokenKey)) {
        onLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="questions-section">
      <Questions questionsList={questions} />;
    </div>
  );
}
