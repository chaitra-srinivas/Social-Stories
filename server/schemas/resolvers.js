const Article = require("../models/Article");

const resolvers = {
  Query: {
    articles: async function () {
      return await Article.find({});
    },

    article: async function (parent, args) {
      return await Article.findById(args.id);
    }
  },

  Mutation: {
    createArticle: function (parent, args) {
      const article = new Article(args.articleInput);
      return article.save();
    },

    deleteArticle: async function (parent, args) {
      return await Article.findByIdAndRemove(args.id);
    },

    updateArticle: async function (parent, args) {
      return await Article.findByIdAndUpdate(args.id, args.articleInput, {
        new: true,
      });
    }
  }
};

module.exports = resolvers;
