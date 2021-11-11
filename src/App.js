import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import BookForm from "./components/BookForm"

import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("authors")
  return (
    <div>
      <button onClick={() => setCurrentView("authors")}>authors</button>
      <button onClick={() => setCurrentView("books")}>books</button>
      <button onClick={() => setCurrentView("book_form")}>add book</button>
      {currentView === "authors" ? (
        <Authors />
      ) : currentView === "books" ? (
        <Books />
      ) : currentView === "book_form" ? (
        <BookForm />
      ) : null}
    </div>
  )
}

export default App
