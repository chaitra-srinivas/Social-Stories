import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

const GET_STORIES = gql`
  {
    stories {
      id
      templateId
      title
      userId
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

const GET_MY_STORIES = gql`
  query mystories($userId: ID!) {
    mystories(userId: $userId) {
      id
      templateId
      title
      userId
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

const GET_STORY = gql`
  query story($id: ID!) {
    story(id: $id) {
      id
      templateId
      title
      userId
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

export { GET_STORY, GET_STORIES, GET_MY_STORIES, QUERY_USER };
