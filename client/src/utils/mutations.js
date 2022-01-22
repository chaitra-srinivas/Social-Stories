import { gql } from '@apollo/client';

const CREATE_ARTICLE = gql`
mutation createArticle($title: String!, $content: String!) {
  createArticle(articleInput: { title: $title, content: $content }) {
    title
    content
    id
  }
}
`;

const DELETE_ARTICLE = gql`
mutation deleteArticle($id: ID!) {
  deleteArticle(id: $id) {
    title
    content
    id
  }
}
`;

const UPDATE_ARTICLE = gql` 
mutation updateArticle($id: ID!, $title: String!, $content: String!) {     
  updateArticle(id: $id, articleInput: { title: $title, content: $content }) { 
    id
    title
    content
  }
}
`;

const CREATE_STORY = gql`
mutation createStory($title: String!, $content: String!) {
  createStory(storyInput: { title: $title, content: $content }) {
    id
    title
    content
  }
}
`;

const DELETE_STORY = gql`
mutation deleteStory($id: ID!) {
  deleteStory(id: $id) {
    id
    title
    content
  }
}
`;

const UPDATE_STORY = gql` 
mutation updateStory($id: ID!, $title: String!, $content: String!) {     
  updateStory(id: $id, storyInput: { title: $title, content: $content }) { 
    id
    title
    content
  }
}
`;
export { CREATE_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE, CREATE_STORY, DELETE_STORY, UPDATE_STORY };
