import { useState, useEffect } from "react"
import { useQuery, useApolloClient } from "@apollo/client"
import { LOGGEDIN_USER, ALL_BOOKS } from "graphql/queries/queries.gql"

const Recommendations = () => {
  const [books, setBooks] = useState([])
  const { loading, error, data } = useQuery(LOGGEDIN_USER)
  const client = useApolloClient()

  const cachedBooks = client.readQuery({
    query: ALL_BOOKS,
  })

  useEffect(() => {
    setBooks(cachedBooks.allBooks)
  }, [cachedBooks])

  if (loading) return <div>Loading...</div>
  if (error) console.log(error.message)

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        books in your favorite genre <strong>patterns</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((book) =>
              book.genres.includes(data.loggedinUser.favoriteGenre)
            )
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
