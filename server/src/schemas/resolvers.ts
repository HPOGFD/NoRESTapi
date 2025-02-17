const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const { signToken } = require('../services/auth');

const resolvers = {
  Query: {
    // Get a single user by ID or username
    getSingleUser: async (_: any, { id, username }: { id: string, username: string }) => {
      return await User.findOne({ 
        $or: [{ _id: id }, { username }] 
      });
    },

    // Get logged-in user's details
    me: async (_: any, args: any, context: any) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Create a new user and return token
    createUser: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong!');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Login a user and return token
    login: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const user = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Save a book to the user's `savedBooks` field
    saveBook: async (_: any, { bookId, title, authors, description, image, link }: { bookId: string, title: string, authors: string[], description: string, image: string, link: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return await User.findByIdAndUpdate(
        context.user._id,
        { 
          $addToSet: { savedBooks: { bookId, title, authors, description, image, link } }
        },
        { new: true, runValidators: true }
      );
    },

    // Remove a book from `savedBooks`
    deleteBook: async (_: any, { bookId }: { bookId: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
