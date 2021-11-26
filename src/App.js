import { useState } from "react"
import { useApolloClient } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import BookForm from "./components/BookForm"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations";

import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("books")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setCurrentView("authors")
  }

  return (
    <div>
      <div style={{marginBottom: 100}}>
        <button onClick={() => setCurrentView("authors")}>authors</button>{" "}
        <button onClick={() => setCurrentView("books")}>books</button>{" "}
        {token ? (
          <>
            <button onClick={() => setCurrentView("add_book")}>add book</button>{" "}
            <button onClick={logout}>logout</button>{" "}
            <button onClick={() => setCurrentView("recommend")}>recommend</button>{" "}
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
