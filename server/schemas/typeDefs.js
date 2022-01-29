const { gql } = require("apollo-server-express");

const typeDefs = gql(`

type Variable{
    id: ID!
    varId: String!
    name: String
    description: String
    value: String
}

type Page{
    id: ID!
    pageId: String!
    image: String
    content: String
    variables: [Variable]
}

type Story{
    id: ID!
    templateId: String!
    title: String
    pages: [Page]
}

input VariableInput{
    varId: String!
    name: String
    description: String
    value: String
}

input PageInput{
    pageId: String!
    image: String
    content: String!
    variables: [VariableInput]!
}

input StoryInput{
    templateId: String!
    title: String!
    pages: [PageInput]!
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

`);

module.exports = typeDefs;
