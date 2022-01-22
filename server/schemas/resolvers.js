const Article = require("../models/Article");
const Stories = require("../models/Stories");

const resolvers = {

  Query: {
    stories: async function () {
      return await Stories.find({});
    },

    story: async function (parent, args) {
      return await Stories.findById(args.id);
    }, 
  
  },

  Mutation: {
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
  
   
  }
};

module.exports = resolvers;
