import { AuthenticationError } from 'apollo-server-errors';
import User, { UserDocument } from '../models/User.js';
import { signToken } from '../middleware/Auth.js'; // Import signToken instead of authMiddleware
import { BookDocument } from '../models/Book.js';

interface Context {
  user?: UserDocument;
}

const resolvers = {
  Query: {
    getSingleUser: async (_: unknown, { id, username }: { id?: string; username?: string }) => {
      return await User.findOne({ 
        $or: [{ _id: id }, { username }] 
      });
    },

    me: async (_: unknown, __: unknown, context: Context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (_: unknown, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong!');
      }
      const token = signToken(user.username, user.email, user._id); // Use signToken to generate JWT
      return { token, user };
    },

    login: async (_: unknown, { username, email, password }: { username?: string; email?: string; password: string }) => {
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

      const token = signToken(user.username, user.email, user._id); // Use signToken to generate JWT
      return { token, user };
    },

    saveBook: async (_: unknown, { bookInput }: { bookInput: BookDocument }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      // Find and update the user
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookInput } }, // Add book to savedBooks if not already in the list
        { new: true, runValidators: true }
      ).exec();
    
      if (!updatedUser) {
        throw new Error('User not found');
      }
    
      return updatedUser; // ✅ Return full user object
    },
    
    

    deleteBook: async (_: unknown, { bookId }: { bookId: string }, context: Context) => {
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
