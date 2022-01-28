import { gql } from '@apollo/client';

const CREATE_STORY = gql`
mutation createStory($templateId: String!, $title: String! , $pages: [PageInput]! ) {
  createStory(storyInput: { templateId: $templateId, title: $title, pages: $pages}) {
    id
    templateId
    title
    pages{
      id
      content
      variables{
        id
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
    pages{
      id
      content
      variables{
        id
        name
        description
        value
      }
    }
  }
}
`;

const UPDATE_STORY = gql` 
mutation updateStory($id: ID!,$templateId: String! $title: String!, $pages: [PageInput]!) {     
  updateStory(id: $id, storyInput: { templateId: $templateId, title: $title, pages: $pages }) { 
    id
    templateId
    title
    pages{
      id
      content
      variables{
        id
        name
        description
        value
      } 
    }
  }
}
`;
export { CREATE_STORY, DELETE_STORY, UPDATE_STORY };


