import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [bookFilter, setBookFilter] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  let books = result.data.allBooks
  const genres = []
  books.forEach(b => {
    b.genres.forEach(g => {
      genres.push(g)
    })
  })
  const uniqGenres = [...new Set(genres)];

  if (bookFilter) {
    books = books.filter(book => book.genres.includes(bookFilter) === true)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {uniqGenres.map(g =>
          <button key={g} onClick={() => setBookFilter(g)}>{g}</button>
        )}
        <button key={'all_genres'} onClick={() => setBookFilter(null)}>all genres</button>
      </div>
    </div>
  )

}

export default Books