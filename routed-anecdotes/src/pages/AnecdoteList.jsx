import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link
              style={{ cursor: "pointer" }}
              to={`/anecdotes/${anecdote.id}`}
            >
              {anecdote.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
