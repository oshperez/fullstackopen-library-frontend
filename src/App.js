import { gql, useQuery } from "@apollo/client"

import Authors from "./components/Authors"

import "./App.css"

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

function App() {
  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Authors authors={result.data.allAuthors} />
    </div>
  )
}

export default App
