import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState({
    pointer: 0,
    votes: new Array(anecdotes.length).fill(0),
  });

  const nextAnecdote = () =>
    setSelected((prev) => ({
      ...prev,
      pointer: Math.floor(Math.random() * anecdotes.length),
    }));

  const addVote = () =>
    setSelected((prev) => ({
      ...prev,
      votes: prev.votes.map((vote, index) =>
        index === prev.pointer ? vote + 1 : vote,
      ),
    }));

  const maxVotesIndex = selected.votes.indexOf(Math.max(...selected.votes));
  selected;

  return (
    <main>
      <section>
        <h1>Anecdotes of the day:</h1>
        <div>{anecdotes[selected.pointer]}</div>
        <p>Has {selected.votes[selected.pointer]} votes </p>
        <button onClick={addVote}>Vote</button>
        <button onClick={nextAnecdote}>Next anecdote</button>
      </section>
      <section>
        <h1>Anecdote with the most Votes:</h1>
        <p>{anecdotes[maxVotesIndex]}</p>
        <p>Number of Votes: {selected.votes[maxVotesIndex]}</p>
      </section>
    </main>
  );
};

export default App;
