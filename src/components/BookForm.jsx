import { useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_BOOK } from "graphql/mutations/mutations.gql"

import {
  updateBookCache,
  updateAuthorCache,
  updateRecommendationCache,
} from "utils/helpers/cache.helper"

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: "",
    genres: [],
  })
  const [genre, setGenre] = useState("")

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (store, { data }) => {
      updateBookCache(data.addBook)
      updateAuthorCache(data.addBook.author)
      updateRecommendationCache(data.addBook)
    },
  })

  const handleChange = (e, field) => {
    setBook((prev) => ({
      ...prev,
      [field]:
        field === "published" ? parseInt(e.target.value, 10) : e.target.value,
    }))
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
    <form onSubmit={handleSubmit}>
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
