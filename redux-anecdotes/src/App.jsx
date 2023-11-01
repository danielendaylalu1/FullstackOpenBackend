import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div>
      <h2>Anecdotes</h2>
      {showMessage && <Notification message={message} />}
      <AnecdoteList setMessage={setMessage} setShowMessage={setShowMessage} />
      <AnecdoteForm setMessage={setMessage} setShowMessage={setShowMessage} />
    </div>
  );
};

export default App;
