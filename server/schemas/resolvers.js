const { AuthenticationError } = require("apollo-server-express");
const { User, Stories } = require("../models");
const {signToken} = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("stories");
    },
    user: async (root, { username }) => {
      return await User.findOne({ username }).populate("stories");
    },
    stories: async (root, { username }) => {
      const params = username ? { username } : {};
      return await Stories.find(params).sort({ title: -1 });
    },
    story: async function (parent, args) {
      return await Stories.findById(args.id);
    },
  },

  Mutation: {
    addUser: async (root, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (root, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid username/password");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid username/password");
      }

      const token = signToken(user);

      return { token, user };
    },

    createStory: function (parent, args) {
      const story = new Stories(args.storyInput);
      return story.save();
    },

    deleteStory: async function (parent, args) {
      return await Stories.findByIdAndRemove(args.id);
    },

    updateStory: async function (parent, args) {
      return await Stories.findByIdAndUpdate(args.id, args.storyInput, {
        new: true,
      });
    },
  },
};

module.exports = resolvers;
