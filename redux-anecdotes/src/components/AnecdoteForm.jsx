import { useDispatch } from "react-redux";
import { addAnecdote } from "../store/anecdoteSlice";
const AnecdoteForm = ({ setMessage, setShowMessage }) => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = e.target.content.value;
          console.log(content);
          dispatch(addAnecdote(content));
          setMessage(`created '${content}'`);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setMessage("");
          }, 5000);
          e.target.content.value = "";
        }}
      >
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
