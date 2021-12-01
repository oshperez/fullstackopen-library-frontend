import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS, LOGGEDIN_USER } from "graphql/queries/queries.gql"
import { useEffect } from "react"

const Recommendations = ({ user }) => {
  const { data: dataFromUser } = useQuery(LOGGEDIN_USER)

  const [getFavoriteBooks, { error, loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (dataFromUser?.loggedinUser) {
      getFavoriteBooks({
        variables: { genres: [dataFromUser.loggedinUser.favoriteGenre] },
      })
    }
  }, [dataFromUser, getFavoriteBooks])

  if (loading) return <div>loading</div>
  if (error) return <div>{error.message}</div>

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
          {data?.allBooks.map((book) => (
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
