/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../store/anecdoteSlice";
import FilterAnecdote from "./FilterAnecdote";
const AnecdoteList = ({ setMessage, setShowMessage }) => {
  let filter = useSelector((state) => state.filter);
  let anecdotes = useSelector((state) => state.anecdote);
  anecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  );
  anecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();
  return (
    <>
      <FilterAnecdote />
      <br />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(addVote(anecdote.id));
                setMessage(`you voted '${anecdote.content}'`);
                setShowMessage(true);
                setTimeout(() => {
                  setShowMessage(false);
                  setMessage("");
                }, 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
