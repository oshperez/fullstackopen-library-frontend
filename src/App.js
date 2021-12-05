import { useState, useEffect } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import BookForm from "./components/BookForm"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"

import { BOOK_ADDED } from "graphql/subscriptions/subscriptions.gql"

import {
  updateBookCache,
  updateAuthorCache,
  updateRecommendationCache,
} from "utils/helpers/cache.helper"

import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("books")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const {
        data: { bookAdded },
      } = subscriptionData

      updateBookCache(bookAdded)
      updateAuthorCache(bookAdded.author)
      updateRecommendationCache(bookAdded)

      window.alert(`${bookAdded.title} by ${bookAdded.author.name} was added`)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("library-user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setCurrentView("books")
  }

  return (
    <div>
      <div style={{ marginBottom: 50 }}>
        <button onClick={() => setCurrentView("authors")}>authors</button>{" "}
        <button onClick={() => setCurrentView("books")}>books</button>{" "}
        {token ? (
          <>
            <button onClick={() => setCurrentView("add_book")}>add book</button>{" "}
            <button onClick={logout}>logout</button>{" "}
            <button onClick={() => setCurrentView("recommend")}>
              recommend
            </button>{" "}
          </>
        ) : (
          <button onClick={() => setCurrentView("login")}>login</button>
        )}
      </div>

      {currentView === "authors" ? (
        <Authors />
      ) : currentView === "books" ? (
        <Books />
      ) : currentView === "login" ? (
        <Login setToken={setToken} setCurrentView={setCurrentView} />
      ) : currentView === "add_book" ? (
        <BookForm />
      ) : currentView === "recommend" ? (
        <Recommendations />
      ) : null}
    </div>
  )
}

export default App
