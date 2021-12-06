import { gql } from "@apollo/client"
import { AUTHOR_DETAILS, BOOK_DETAILS } from "graphql/fragments/fragments.gql"

export const ALL_AUTHORS = gql`
  ${AUTHOR_DETAILS}
  query allAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
`
export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query allBooks($author: String, $genres: [String]) {
    allBooks(author: $author, genres: $genres) {
      ...BookDetails
    }
  }
`

export const LOGGEDIN_USER = gql`
  query loggedinUser {
    loggedinUser {
      favoriteGenre
    }
  }
`
