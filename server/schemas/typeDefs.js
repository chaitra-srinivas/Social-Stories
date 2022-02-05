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
    userId: ID
}

type User{
    _id: ID
    username: String
    email: String
    password: String
   
}

type Auth {
    token: ID!
    user: User
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
    userId: ID!
}

type Query{
    story(id: ID!) : Story 
    users: [User]
    user(username: String): User
    stories(username: String): [Story]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createStory(storyInput: StoryInput): Story
    deleteStory(id: ID!): Story
    updateStory(id: ID!, storyInput: StoryInput): Story!
}

`);

module.exports = typeDefs;
