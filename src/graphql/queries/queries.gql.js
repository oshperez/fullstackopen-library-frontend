import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query($author: String, $genres: [String]) {
    allBooks(author: $author, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const LOGGEDIN_USER = gql`
  query {
    loggedinUser {
      favoriteGenre
    }
  }
`
