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

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $birthyear: Int!) {
    editAuthor(name: $author, setBornTo: $birthyear) {
      name
      born
    }
  } 
`

export const LOGIN = gql`
  mutation login($credentials: CredentialsInput!) {
    login(credentials: $credentials) {
      value
    }
  }
`