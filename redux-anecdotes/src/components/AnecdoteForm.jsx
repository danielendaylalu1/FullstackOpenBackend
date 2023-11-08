/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../store/anecdoteSlice";

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
          dispatch(
            createNewAnecdote({
              content,
              votes: 0,
            })
          );
          setMessage(`created '${content}'`);
          setShowMessage(true);
          const messageTimout = setTimeout(() => {
            setShowMessage(false);
            setMessage("");
          }, 2000);
          e.target.content.value = "";
          return () => {
            clearTimeout(messageTimout);
          };
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
