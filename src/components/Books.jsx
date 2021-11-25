import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "graphql/queries/queries.gql"

import BookFilter from "components/BookFilter"

const Books = () => {
  const [filter, setFilter] = useState(null)
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks
            .filter((book) => (filter ? book.genres.includes(filter) : true))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <BookFilter books={data.allBooks} setFilter={setFilter} />
    </>
  )
}

export default Books
