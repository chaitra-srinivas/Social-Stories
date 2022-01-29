import { gql } from "@apollo/client";

const GET_STORIES = gql`
  {
    stories {
      id
      templateId
      title
      pages{
        id
        pageId
        content
        image
        variables{
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
      pages{
        id
        pageId
        content
        image
        variables{
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





export { GET_STORY, GET_STORIES };
