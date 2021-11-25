import { useState, useEffect } from "react"
import Select from "react-select"

function createOptions(books) {
  return books
    .reduce(
      (genreList, currentBook) => {
        genreList = [
          ...genreList,
          ...currentBook.genres.filter((genre) => !genreList.includes(genre)),
        ]
        return genreList
      },
      ["all"]
    )
    .map((genre) => ({ value: genre, label: genre }))
}

const BookFilterForm = ({ books, setFilter }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState(null)

  useEffect(() => {
    const options = createOptions(books)
    setOptions(options)
  }, [books])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilter(selectedOption.value === "all" ? null : selectedOption.value)
    setSelectedOption(null)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <input type="submit" value="filter" />
    </form>
  )
}

export default BookFilterForm
