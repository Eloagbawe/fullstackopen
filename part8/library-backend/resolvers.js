const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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

      const book = newBook.populate("author")
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
