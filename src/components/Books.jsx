import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({ books }) => {
  const { data, loading } = useQuery(ALL_BOOKS)
  if (loading) return <div>Loading...</div>

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
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Books
