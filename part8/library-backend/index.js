const { ApolloServer, gql, RenameRootFields } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const typeDefs = gql`

  type Author {
      name: String!,
      id: ID!,
      born: Int
  }

  type Book {
      title: String!,
      published: Int!,
      author: Author!,
      genres: [String!]!,
      id: ID!
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
      addAuthor(
        name: String!,
        born: Int
      ): Author
      addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
      ): Book
      editAuthor(
          name: String!,
          setBornTo: Int!
      ): Author
  }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.genre) {
                return Book.find({})
            }

            return Book.find({ genres: { $in: [ args.genre ] }})
        },
        allAuthors: () => {
            return Author.find({})
        }
    },
    Mutation: {
        addAuthor: async (root, args) => {
            const author = new Author({ ...args })

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })

            const book = new Book(
                {
                    title: args.title,
                    author: author,
                    published: args.published,
                    genres: args.genres
                }
            )

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        }
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