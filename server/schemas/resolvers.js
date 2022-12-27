const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args) => {
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
    addUser: async (parent, args, context) => {
      const user = await User.create({
        username: args.username,
        password: args.password,
        email: args.email,
      });

      if (!user) {
        throw new AuthenticationError("Something went wrong!");
      }
      //const token = signToken(user);
      return user;
    },
    login: async (parent, args) => {
      const user = await User.findOne({email: args.email});
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      //const token = signToken(user);
    return user;
    },
  },
};

module.exports = resolvers;
