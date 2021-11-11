import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_BOOK } from "../mutations"
import { ALL_BOOKS, ALL_AUTHORS } from "../queries"

const BookForm = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: null,
    genres: [],
  })
  const [genre, setGenre] = useState("")

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const handleChange = (e, field) => {
    setBook((prev) => ({
      ...prev,
      [field]:
        field === "published" ? parseInt(e.target.value, 10) : e.target.value,
    }))
    console.log(book)
  }

  const addGenre = (e) => {
    e.preventDefault()
    setBook((prev) => ({
      ...prev,
      genres: prev.genres.concat(genre),
    }))
    setGenre("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBook({ variables: { book } })
    setBook({
      title: "",
      author: "",
      published: "",
      genres: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
      <div>
        title
        <input value={book.title} onChange={(e) => handleChange(e, "title")} />
      </div>
      <div>
        author
        <input
          value={book.author}
          onChange={(e) => handleChange(e, "author")}
        />
      </div>
      <div>
        published
        <input
          value={book.published}
          onChange={(e) => handleChange(e, "published")}
        />
      </div>
      <div>
        genre
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button onClick={addGenre}>Add genre</button>
      </div>
      <div>genres: {book.genres.join(", ")} </div>
      <input type="submit" value="add book" />
    </form>
  )
}

export default BookForm
