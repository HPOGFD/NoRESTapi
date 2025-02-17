const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const { signToken } = require('../services/auth');

const resolvers = {
  Query: {
    // Get a single user by ID or username
    getSingleUser: async (parent, { id, username }) => {
      return await User.findOne({ 
        $or: [{ _id: id }, { username }] 
      });
    },

    // Get logged-in user's details
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Create a new user and return token
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong!');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Login a user and return token
    login: async (parent, { username, email, password }) => {
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
    saveBook: async (parent, { bookId, title, authors, description, image, link }, context) => {
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
    deleteBook: async (parent, { bookId }, context) => {
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

module.exports = resolvers;
