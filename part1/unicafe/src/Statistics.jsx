import StatisticsLine from "./StatisticsLine";

export default function Statistics(props) {
  const { good, bad, neutral } = props;

  const isFeedbackGiven = (good || neutral || bad) !== 0;
  return (
    <>
      <h1>Statistics:</h1>

      {isFeedbackGiven ? (
        <table>
          <tbody>
            <StatisticsLine text="good:" value={good} />
            <StatisticsLine text="neutral:" value={neutral} />
            <StatisticsLine text="bad:" value={bad} />
            <StatisticsLine text="All:" value={good + bad + neutral} />
            <StatisticsLine
              text="Average:"
              value={(good && bad) !== 0 ? (good - bad) / (good + bad) : "0"}
            />
            <StatisticsLine text="good:" value={good} />
            <StatisticsLine
              text="Positive:"
              value={(good / (good + bad + neutral)) * 100 + "%"}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}
