import { createSlice } from "@reduxjs/toolkit";
import { create, getAll } from "../services/anecdotes";

const initialState = [];
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      return (state = action.payload);
    },
    createAnecdote(state, action) {
      state.push(action.payload);
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

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(addAnecdote(anecdotes));
  };
};

export const createNewAnecdote = (data) => {
  return async (dispatch) => {
    const anecdote = await create(data);
    dispatch(createAnecdote(anecdote));
  };
};

export const { addAnecdote, addVote, createAnecdote } = anecdoteSlice.actions;

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
