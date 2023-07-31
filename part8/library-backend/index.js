const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");


mongoose.set("strictQuery", false);

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
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
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
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
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      const bookAuthor = author ? await Author.findOne({ name: author }) : null;
      let query = {};
      if (author || genre) {
        if (genre && author) {
          query = {
            author: bookAuthor ? bookAuthor._id : null,
            genres: genre,
          };
        } else if (author) {
          query = { author: bookAuthor ? bookAuthor._id : null };
        } else {
          query = { genres: genre };
        }
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const { author } = args;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const authorExists = await Author.findOne({ name: author });
      let newAuthor;

      if (!authorExists) {
        newAuthor = new Author({ name: author, bookCount: 0 });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error: error._message,
            },
          });
        }
      }

      const newBook = new Book({
        ...args,
        author: authorExists ? authorExists._id : newAuthor._id,
      });

      try {
        await newBook.save();
        if (authorExists) {
          authorExists.bookCount += 1;
          await authorExists.save();
        } else {
          newAuthor.bookCount += 1;
          await newAuthor.save();
        }
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error: error._message,
          },
        });
      }
      return newBook.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      const { name, setBornTo } = args;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name });

      if (!author) {
        return null;
      }
      author.born = setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing Author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error: error._message,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error: error._message,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
