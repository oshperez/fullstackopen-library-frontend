import client from "graphql/apolloClient"
import {
  ALL_BOOKS,
  ALL_AUTHORS,
  LOGGEDIN_USER,
} from "graphql/queries/queries.gql"

export function updateBookCache(book) {
  const cachedData = client.readQuery({ query: ALL_BOOKS })
  if (cachedData) {
    if (!checkIfIncluded(cachedData.allBooks, book)) {
      const data = { allBooks: [...cachedData.allBooks, book] }
      writeToCache(ALL_BOOKS, data)
    }
  }
}

export function updateAuthorCache(author) {
  const cachedData = client.readQuery({ query: ALL_AUTHORS })
  if (cachedData) {
    const data = {
      allAuthors: checkIfIncluded(cachedData.allAuthors, author)
        ? [
            ...cachedData.allAuthors.map((cachedAuthor) =>
              cachedAuthor.name !== author.name ? cachedAuthor : author
            ),
          ]
        : [...cachedData.allAuthors, author],
    }
    writeToCache(ALL_AUTHORS, data)
  }
}

export function updateRecommendationCache(book) {
  const userCachedData = client.readQuery({ query: LOGGEDIN_USER })

  if (userCachedData) {
    const user = userCachedData.loggedinUser

    if (book.genres.includes(user.favoriteGenre)) {
      const variables = { genres: [user.favoriteGenre] }
      const recommendations = client.readQuery({ query: ALL_BOOKS, variables })

      if (recommendations && !checkIfIncluded(recommendations.allBooks, book)) {
        const data = { allBooks: recommendations.allBooks.concat(book) }
        writeToCache(ALL_BOOKS, data, variables)
      }
    }
  }
}

function checkIfIncluded(set, obj) {
  return set.map((el) => el.id).includes(obj.id)
}

function writeToCache(query, data, variables = {}) {
  client.writeQuery({
    query,
    variables,
    data,
  })
}
