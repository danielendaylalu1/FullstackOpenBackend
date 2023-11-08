/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { initializeAnecdote, voteAnecdote } from "../store/anecdoteSlice";
import FilterAnecdote from "./FilterAnecdote";
import { useEffect } from "react";
import { manageNotification } from "../store/notificationSlice";

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

  useEffect(() => {
    dispatch(initializeAnecdote());
  }, []);
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
                dispatch(
                  voteAnecdote(anecdote.id, {
                    ...anecdote,
                    votes: anecdote.votes + 1,
                  })
                );
                dispatch(
                  manageNotification(`you voted '${anecdote.content}'`, 2000)
                );
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
