/* eslint-disable react/prop-types */
import { useField } from "../hooks";
import { Form } from "react-bootstrap";
import { Button, TextField } from "@mui/material";

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
      <Form onSubmit={handleSubmit}>
        <div>
          <TextField label="content" {...content} />
        </div>
        <div>
          <TextField label="author" {...author} />
        </div>
        <div>
          <TextField label="url" {...info} />
        </div>
        {/* <Form.Group> */}
        {/* <Form.Label>content:</Form.Label>
          <Form.Control {...content}></Form.Control> */}
        {/* <Form.Label>author:</Form.Label>
        <Form.Control {...author}></Form.Control>
        <Form.Label>url:</Form.Label>
        <Form.Control {...info}></Form.Control> */}

        <Button type="submit" variant="contained" color="primary">
          create
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={() => {
            contentReset();
            authorReset();
            infoReset();
          }}
        >
          rest
        </Button>
        {/* </Form.Group> */}
      </Form>
    </div>
  );
};

export default CreateNew;
