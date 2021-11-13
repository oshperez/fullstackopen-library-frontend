import { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../mutations"
import { ALL_AUTHORS } from "../queries"

const AuthorForm = (props) => {
  const [author, setAuthor] = useState("")
  const [birthyear, setBirthyear] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({ variables: { author, birthyear: parseInt(birthyear) } })
    setAuthor("")
    setBirthyear("")
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          born
          <input
            type="text"
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </div>
        <input type="submit" value="update author" />
      </form>
    </>
  )
}

export default AuthorForm
