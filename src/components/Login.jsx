import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "graphql/mutations/mutations.gql"

const Login = ({ setToken, setCurrentView }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
  })


  useEffect(() => {
    if (data) {
      const token = data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
      setCurrentView("books")
      setUsername("")
      setPassword("")
    }
  }, [data]) // eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { credentials: { username, password } } })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <input type="submit" />
    </form>
  )
}

export default Login
