import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genres: [String]) {
    allBooks(author: $author, genres: $genres) {
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

export const LOGGEDIN_USER = gql`
  query loggedinUser {
    loggedinUser {
      favoriteGenre
    }
  }
`
