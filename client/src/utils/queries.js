import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      username
      email
      stories {
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
  }
`;

const GET_STORIES = gql`
  {
    stories {
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

const GET_STORY = gql`
  query story($id: ID!) {
    story(id: $id) {
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

export { GET_STORY, GET_STORIES, QUERY_USER };
