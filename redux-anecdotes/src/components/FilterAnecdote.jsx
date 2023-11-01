import { useDispatch } from "react-redux";
import { startFilter } from "../store/filterSlice";

const FilterAnecdote = () => {
  const dispatch = useDispatch();
  return (
    <div>
      filter:
      <input
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(startFilter(e.target.value.trim()));
        }}
      />
    </div>
  );
};

export default FilterAnecdote;
