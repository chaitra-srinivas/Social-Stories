import { gql } from '@apollo/client';

const CREATE_STORY = gql`
mutation createStory($templateId: String!, $title: String! , $pages: [PageInput]! ) {
  createStory(storyInput: { templateId: $templateId, title: $title, pages: $pages}) {
    id
    title
    pages{
      id
    }
  }
}
`; 
/* 
const CREATE_STORY = gql`
mutation createStory($storyInput: StoryInput! ) {
  createStory(storyInput: $storyInput) {
    Story
  }
}
`; */

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
export { CREATE_STORY, DELETE_STORY, UPDATE_STORY };
