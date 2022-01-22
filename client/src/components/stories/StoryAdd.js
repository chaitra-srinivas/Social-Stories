import { React } from "react";
import { Link, useParams } from "react-router-dom";
import {  useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";

function StoryAdd(props) {
 
  let { title, content } = useParams;

  const [createStory, { data, loading, error }] = useMutation(CREATE_STORY);

  if (loading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createStory({ variables: { title: title.value, content: content.value } ,
            refetchQueries: [{ query: GET_STORIES }]});
        }}>
          <div className='form-group'>
                <label>Title:</label>
                <input
                  type='text'
                  className='form-control'
                  ref={function (node) {
                    return (title = node);
                  }}
                />
              </div>
              <div className='form-group'>
                <label>Content:</label>
                <textarea
                  rows='5'
                  className='form-control'
                  ref={function (node) {
                    return (content = node);
                  }}
                />
              </div>
              <p className='btn-group'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
                <Link to='/stories' className='btn btn-secondary'>
                  Cancel
                </Link>
              </p>
      </form>
    </div>
  );

  /* return (
    <Mutation mutation={CREATE_STORY}>
      {function (createStory, { data }) {
        return (
          <div>
            <h4>Add a Social Story</h4>
            <hr />
            <form
              onSubmit={function (event) {
                event.preventDefault();
                createStory({
                  variables: { title: title.value, content: content.value },
                  refetchQueries: [{ query: GET_STORIES }],
                });
                props.history.push("/stories");
              }}>
              <div className='form-group'>
                <label>Title:</label>
                <input
                  type='text'
                  className='form-control'
                  ref={function (node) {
                    return (title = node);
                  }}
                />
              </div>
              <div className='form-group'>
                <label>Content:</label>
                <textarea
                  rows='5'
                  className='form-control'
                  ref={function (node) {
                    return (content = node);
                  }}
                />
              </div>
              <p className='btn-group'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
                <Link to='/stories' className='btn btn-secondary'>
                  Cancel
                </Link>
              </p>
            </form>
          </div>
        );
      }}
    </Mutation>
  ); */
}

export default StoryAdd;
