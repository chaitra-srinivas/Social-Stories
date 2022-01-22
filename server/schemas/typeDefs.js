const { gql } = require("apollo-server-express");

const typeDefs = gql(`

type Story{
    id: ID!
    title: String!
    content: String!
}

input StoryInput{
    title: String!
    content: String!
}

type Query{
    stories: [Story]
    story(id: ID!) : Story 
}

type Mutation {
    createStory(storyInput: StoryInput): Story
    deleteStory(id: ID!): Story
    updateStory(id: ID!, storyInput: StoryInput): Story!
}



type Article{
    id: ID!
    title: String!
    content: String!
}

input ArticleInput{
    title: String!
    content: String!
}

type Query{
    articles: [Article]
    article(id: ID!) : Article 
}

type Mutation {
    createArticle(articleInput: ArticleInput): Article
    deleteArticle(id: ID!): Article
    updateArticle(id: ID!, articleInput: ArticleInput): Article!
}


`);

module.exports = typeDefs;
