import { gql } from "@apollo/client"

export const CREATE_BOOK = gql`
  mutation createBook($book: BookInput!) {
    addBook(bookObj: $book) {
      id
      title
      author {
        id
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $birthyear: Int!) {
    editAuthor(name: $author, setBornTo: $birthyear) {
      id
      name
      bookCount
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
