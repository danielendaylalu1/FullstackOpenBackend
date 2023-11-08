/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../store/anecdoteSlice";
import { manageNotification } from "../store/notificationSlice";

const AnecdoteForm = () => {
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
          dispatch(manageNotification(`created '${content}'`, 2000));
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
