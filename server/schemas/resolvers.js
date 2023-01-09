const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args) => {
      const foundUser = await User.findOne({
        $or: [{ _id: args._id }, { username: args.username }],
      })
        .select("-__v -password")
        .populate("savedBooks");

      if (!foundUser) {
        throw new AuthenticationError("Not logged in");
      }

      return foundUser;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({
        username: args.username,
        password: args.password,
        email: args.email,
      });

      if (!user) {
        throw new AuthenticationError("Something went wrong!");
      }
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user);
      return {token, user};
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user.id },
          { $addToSet: { savedBooks: args.input } },
          { new: true}
        );
        return updatedUser;
      }
      throw new AuthenticationError("You must login to save a book.");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Couldn't find user with this id!");
    },
  },
};

module.exports = resolvers;
