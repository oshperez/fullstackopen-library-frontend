import { useState } from "react"
import { useMutation } from "@apollo/client"
import Select from "react-select"
import { EDIT_AUTHOR } from "graphql/mutations/mutations.gql"
import { updateAuthorCache } from "utils/helpers/cache.helper"

const AuthorForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [birthyear, setBirthyear] = useState("")

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (_, { data }) => {
      updateAuthorCache(data.editAuthor)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        author: selectedOption.value,
        birthyear: parseInt(birthyear),
      },
    })
    setBirthyear("")
    setSelectedOption(null)
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            type="text"
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </div>
        <input type="submit" value="update author" />
      </form>
    </>
  )
}

export default AuthorForm
