import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  let anecdotes = useSelector((state) => state);
  anecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = e.target.content.value;
          console.log(content);
          dispatch(addAnecdote(content));
          e.target.content.value = "";
        }}
      >
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
