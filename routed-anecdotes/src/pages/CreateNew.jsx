/* eslint-disable react/prop-types */
import { useField } from "../hooks";

const CreateNew = (props) => {
  const { reset: contentReset, ...content } = useField("text", "content");
  const { reset: authorReset, ...author } = useField("text", "author");
  const { reset: infoReset, ...info } = useField("text", "info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => {
            contentReset();
            authorReset();
            infoReset();
          }}
        >
          rest
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
