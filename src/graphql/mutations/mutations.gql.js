import { gql } from "@apollo/client"
import { AUTHOR_DETAILS, BOOK_DETAILS } from "graphql/fragments/fragments.gql"

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook($book: BookInput!) {
    addBook(bookObj: $book) {
      ...BookDetails
    }
  }
`

export const EDIT_AUTHOR = gql`
  ${AUTHOR_DETAILS}
  mutation editAuthor($author: String!, $birthyear: Int!) {
    editAuthor(name: $author, setBornTo: $birthyear) {
      ...AuthorDetails
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
