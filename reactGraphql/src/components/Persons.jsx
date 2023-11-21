import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Person from "./Person";

/* eslint-disable react/prop-types */
const Persons = ({ persons }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const FIND_A_PERSON = gql`
    query findeApersonByName($selectedUser: String!) {
      findPerson(name: $selectedUser) {
        name
        phone
        id
        address {
          street
          city
        }
      }
    }
  `;
  const result = useQuery(FIND_A_PERSON, {
    variables: { selectedUser },
    skip: !selectedUser,
  });

  if (selectedUser && result.data) {
    console.log(result.data);
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setSelectedUser(null)}
      />
    );
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setSelectedUser(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
