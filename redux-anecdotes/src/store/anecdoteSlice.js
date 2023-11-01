import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        votes: 0,
        id: getId(),
      };
      return state.concat(newAnecdote);
    },
    addVote(state, action) {
      let id = action.payload;
      let changedAnecdote = state.find((obj) => obj.id === id);
      changedAnecdote = {
        ...changedAnecdote,
        votes: changedAnecdote.votes + 1,
      };
      return state.map((obj) =>
        obj.id === changedAnecdote.id ? changedAnecdote : obj
      );
    },
  },
});

export const { addAnecdote, addVote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;

// const anecdote = (state = initialState, action) => {
//   let changedAnecdote;
//   switch (action.type) {
//     case "VOTE":
//       changedAnecdote = state.find((obj) => obj.id === action.payload.id);
//       changedAnecdote = {
//         ...changedAnecdote,
//         votes: changedAnecdote.votes + 1,
//       };
//       return state.map((obj) =>
//         obj.id === changedAnecdote.id ? changedAnecdote : obj
//       );

//     case "ADD":
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export const addVote = (id) => {
//   return {
//     type: "VOTE",
//     payload: {
//       id,
//     },
//   };
// };

// export const addAnecdote = (content) => {
//   return {
//     type: "ADD",
//     payload: {
//       content,
//       votes: 0,
//       id: getId(),
//     },
//   };
// };

// const filter = (state = "", action) => {
//   switch (action.type) {
//     case "FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const startFilter = (value) => {
//   return {
//     type: "FILTER",
//     payload: value,
//   };
// };
