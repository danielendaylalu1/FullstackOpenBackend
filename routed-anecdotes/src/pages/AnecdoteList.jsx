import { Link } from "react-router-dom";

import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

/* eslint-disable react/prop-types */
const AnecdoteList = ({ anecdotes }) => {
  return (
    <Container>
      <h2>Anecdotes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {anecdotes.map((anecdote) => (
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link
                    style={{ cursor: "pointer" }}
                    to={`/anecdotes/${anecdote.id}`}
                  >
                    {anecdote.content}
                  </Link>
                </TableCell>
                <TableCell>{anecdote.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AnecdoteList;
