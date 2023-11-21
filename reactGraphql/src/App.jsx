import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Persons from "./components/Persons";

function App() {
  const GET_ALL_PERSONS = gql`
    query {
      allPersons {
        name
        phone
        address {
          street
          city
        }
        id
      }
    }
  `;
  const result = useQuery(GET_ALL_PERSONS);
  if (result.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  );
}

export default App;
