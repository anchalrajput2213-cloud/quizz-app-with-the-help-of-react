import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    fetch(" https://the-trivia-api.com/v2/questions?limit=7&categories=General%20Knowledge&difficulties=easy&type=multiple") 
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);
  if (questions.length === 0) {
    return <h2>Loading...</h2>;
  }
  if (index === questions.length) {
    return (
      <div className="container result">
        <h1>Quiz Completed</h1>
        <h2>Right Answers : {score}</h2>
        <h2>Wrong Answers : {questions.length - score}</h2>
      </div>
    );
  }
  const q = questions[index];
  const options = [
    q.incorrectAnswers[0],
    q.incorrectAnswers[1],
    q.incorrectAnswers[2],
    q.correctAnswer,
  ];

  function nextQuestion() {
    if (selectedOption === "") {
      console.log("Please select an option");
      return;
    }
    if (selectedOption === q.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setIndex(index + 1);
  }

  return (
    <div className="container">
      <h2>
        Question {index + 1} / {questions.length}
      </h2>
      <h3>{q.question.text}</h3>
      {options.map((option, i) => (
        <label className="option" key={i}>
          <input
            type="radio"
            name="answer"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {option}
        </label>
      ))}
      <button onClick={nextQuestion}>
        {index === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
}
export default App;
