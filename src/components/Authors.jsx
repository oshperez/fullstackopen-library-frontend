import { useQuery } from "@apollo/client"
import AuthorForm from "./AuthorForm";
import { ALL_AUTHORS } from "../queries"

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h1>Authors</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born || "unknown"}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm />
    </>
  )
}

export default Authors
