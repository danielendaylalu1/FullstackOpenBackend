/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addVote, startFilter } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
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
      <div>
        filter:
        <input
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(startFilter(e.target.value.trim()));
          }}
        />
      </div>
      <br />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
