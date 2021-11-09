import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"

import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("authors")
  return (
    <div>
      <button onClick={() => setCurrentView("authors")}>authors</button>
      <button onClick={() => setCurrentView("books")}>books</button>
      {currentView === "authors" ? (
        <Authors />
      ) : currentView === "books" ? (
        <Books />
      ) : null}
    </div>
  )
}

export default App
