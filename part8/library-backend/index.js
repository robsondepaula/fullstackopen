const { ApolloServer, gql, RenameRootFields } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [AuthorBooks!]!
      me: User
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
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.genre) {
                return Book.find({}).populate('author')
            }

            return Book.find({ genres: { $in: [args.genre] } }).populate('author')
        },
        allAuthors: async () => {
            let authors = await Author.find({})
            let books = await Book.find({})
            const authorsWithCount = []

            for (let i = 0; i < authors.length; i++) {
                const count = books.reduce((n, book) => {
                    return n + (book.author == authors[i].id)
                }, 0)

                authorsWithCount.push({
                    name: authors[i].name,
                    born: authors[i].born,
                    bookCount: count
                })
            }

            return authorsWithCount
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = new Author({ ...args })

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

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

                pubsub.publish('BOOK_ADDED', { bookAdded: book })

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: (root, args) => {
            const user = new User({ ...args })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})