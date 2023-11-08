import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";

const App = () => {
  const message = useSelector((state) => state.notification);
  console.log(message);

  return (
    <div>
      <h2>Anecdotes</h2>
      {message !== null && <Notification message={message} />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
