import { gql } from "@apollo/client";

const GET_STORIES = gql`
  {
    stories {
      id
      title
      content
    }
  }
`;

const GET_STORY = gql`
  query story($id: ID!) {
    story(id: $id) {
      id
      title
      content
    }
  }
`;





export { GET_STORY, GET_STORIES };
