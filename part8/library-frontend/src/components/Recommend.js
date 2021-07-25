import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
    const resultBooks = useQuery(ALL_BOOKS)
    const resultMe = useQuery(ME)

    if (resultBooks.loading && resultMe.loading) {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }

    let books = resultBooks.data.allBooks
    const favoriteGenre = resultMe.data.me.favoriteGenre
    books = books.filter(book => book.genres.includes(favoriteGenre) === true)

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre {favoriteGenre}</p>
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
        </div>
    )

}

export default Recommend