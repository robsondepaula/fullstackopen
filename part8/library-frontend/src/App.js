
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token === null) {
      const localToken = window.localStorage.getItem('library-user-token')
      if (localToken) {
        setToken(localToken)
      }
    }
  }, [token])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const loginButton = () => {
    return (
      <button onClick={() => setPage('login')}>login</button>
    )
  }

  const loggedButtons = () => {
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout}>logout</button>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ?
          loginButton() :
          loggedButtons()
        }
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        notify={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        setToken={setToken}
        setError={notify}
        show={page === 'login'}
      />

      <Recommend
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App