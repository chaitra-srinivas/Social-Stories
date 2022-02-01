import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password){
    token
    user{
      id
      username
    }

  }
}
`

const CREATE_STORY = gql`
  mutation createStory(
    $templateId: String!
    $title: String!
    $pages: [PageInput]!
  ) {
    createStory(
      storyInput: { templateId: $templateId, title: $title, pages: $pages }
    ) {
      id
      templateId
      title
      pages {
        id
        pageId
        content
        image
        variables {
          id
          varId
          name
          description
          value
        }
      }
    }
  }
`;

const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id) {
      id
      templateId
      title
      pages {
        id
        pageId
        content
        image
        variables {
          id
          varId
          name
          description
          value
        }
      }
    }
  }
`;

const UPDATE_STORY = gql`
  mutation updateStory(
    $id: ID!
    $templateId: String!
    $title: String!
    $pages: [PageInput]!
  ) {
    updateStory(
      id: $id
      storyInput: { templateId: $templateId, title: $title, pages: $pages }
    ) {
      id
      templateId
      title
      pages {
        id
        pageId
        content
        image
        variables {
          id
          varId
          name
          description
          value
        }
      }
    }
  }
`;
export { CREATE_STORY, DELETE_STORY, UPDATE_STORY,ADD_USER,LOGIN_USER };
