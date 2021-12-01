import { useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_BOOK } from "graphql/mutations/mutations.gql"
import {
  ALL_BOOKS,
  ALL_AUTHORS,
  LOGGEDIN_USER,
} from "graphql/queries/queries.gql"

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: null,
    genres: [],
  })
  const [genre, setGenre] = useState("")

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (store, { data }) => {
      const booksCachedData = store.readQuery({
        query: ALL_BOOKS,
      })

      if (booksCachedData) {
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...booksCachedData,
            allBooks: [...booksCachedData.allBooks, data.addBook],
          },
        })
      }

      const authorsCachedData = store.readQuery({
        query: ALL_AUTHORS,
      })

      if (authorsCachedData) {
        store.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...authorsCachedData,
            allAuthors: [
              ...authorsCachedData.allAuthors.filter(
                (author) => author.name !== data.addBook.author.name
              ),
              data.addBook.author,
            ],
          },
        })
      }

      const userCachedData = store.readQuery({
        query: LOGGEDIN_USER,
      })

      if (
        userCachedData &&
        data.addBook.genres.includes(userCachedData.loggedinUser.favoriteGenre)
      ) {
        const recommendedBooks = store.readQuery({
          query: ALL_BOOKS,
          variables: { genres: [userCachedData.loggedinUser.favoriteGenre] },
        })
        if (recommendedBooks) {
          store.writeQuery({
            query: ALL_BOOKS,
            variables: { genres: [userCachedData.loggedinUser.favoriteGenre] },
            data: {
              allBooks: [...recommendedBooks.allBooks, data.addBook],
            },
          })
        }
      }
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
