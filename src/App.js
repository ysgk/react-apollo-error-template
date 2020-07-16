import React from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export default function App() {
  const {
    loading,
    data
  } = useQuery(ALL_PEOPLE);
  const [logoutMutation, logoutResult] = useMutation(LOGOUT)
  const logout = () => logoutMutation({ awaitRefetchQueries: true, refetchQueries: [ { query: ALL_PEOPLE }]}).catch((e) => {
    // Errors that occur in refetchQueries cannot be caught.
    console.log('This line never gets called.')
  })

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}

      <button onClick={logout}>Logout</button>
    </main>
  );
}
