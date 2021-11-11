import { gql } from "@apollo/client"

export const CREATE_BOOK = gql`
  mutation createBook($book: BookInput) {
    addBook(book: $book) {
      title
      author
      published
      genres
    }
  }
`
