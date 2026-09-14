import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function addReview(review) {
    if (review === "good") {
      setGood((prev) => prev + 1);
    } else if (review === "neutral") {
      setNeutral((prev) => prev + 1);
    } else if (review === "bad") {
      setBad((prev) => prev + 1);
    }
  }
  return (
    <div>
      <h1>Give feedback:</h1>
      <Button onClick={() => addReview("good")} text="good" />
      <Button onClick={() => addReview("neutral")} text="neutral" />
      <Button onClick={() => addReview("bad")} text="bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
