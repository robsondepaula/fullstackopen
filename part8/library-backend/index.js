const {
    ApolloServer,
    gql,
    RenameRootFields
} = require('apollo-server')

const {
    v1: uuid
} = require('uuid')

let authors = [{
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [{
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql `

  type Author {
      name: String!,
      id: ID!,
      born: Int
  }

  type Book {
      title: String!,
      published: Int!,
      author: String!,
      id: ID!,
      genres: [String!]!
  }

  type AuthorBooks {
      name: String!,
      born: Int,
      bookCount: Int!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [AuthorBooks!]!
  }

  type Mutation {
      addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
      ): Book
  }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            const byAuthor = (book) =>
                args.author === book.author
            const byGenre = (book) => book.genres.includes(args.genre)

            let filteredBooks = args.author ? books.filter(byAuthor) : books
            filteredBooks = args.genre ? filteredBooks.filter(byGenre) : filteredBooks

            return filteredBooks
        },
        allAuthors: () => {
            const authorsWithCount = []

            for (let i = 0; i < authors.length; i++) {
                const count = books.reduce((n, book) => {
                    return n + (book.author == authors[i].name)
                }, 0)

                authorsWithCount.push({
                    name: authors[i].name,
                    born: authors[i].born,
                    bookCount: count
                })
            }

            return authorsWithCount
        }
    },
    Mutation: {
        addBook: (root, args) => {
            if (books.find(b => b.title === args.title)) {
                throw new UserInputError('Title must be unique', {
                    invalidArgs: args.title,
                })
            }

            const book = {
                ...args,
                id: uuid()
            }
            books = books.concat(book)


            let author = authors.find(a => a.name === args.author)
            if (!author) {
                author = {
                    name: book.author,
                    id: uuid(),
                }
                authors.concat(author)
            }

            return book
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({
    url
}) => {
    console.log(`Server ready at ${url}`)
})