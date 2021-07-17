
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const authors = props.authors
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      props.notify('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    const intBorn = parseInt(born)
    changeBorn({ variables: { name, born: intBorn } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          <div>
            born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
