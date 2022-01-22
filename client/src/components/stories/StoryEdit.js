import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { GET_STORY } from "../../utils/queries";
import { UPDATE_STORY } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

function StoryEdit(props) {
    
  let {id}= useParams();

 let title, content; 
  function handleCancel(id) {
    props.history.push(`/stories/${id}`);
  }

  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const singleStory = data?.story || {};

  if (loading) return "Loading...";

  return (
    <div>
      <h1>Edit {singleStory.title}</h1>
      <Mutation mutation={UPDATE_STORY}>
        {function (updateStory, { loading, data, error }) {
          return (
            <div>
              <form
                onSubmit={function (event) {
                  event.preventDefault();
                  updateStory({
                    variables: {
                      id: singleStory.id,
                      title: title.value,
                      content: content.value, 
                    },
                  });
                  props.history.push(`/stories/${singleStory.id}`);
                }}>
                <div className='form-group'>
                  <label>Title</label>
                  <input
                    type='text'
                    className='form-control'
                   defaultValue={singleStory.title}
                    ref={function (node) {
                      return (title = node);
                    }}
                  />
                </div>
                <div className='form-group'>
                  <label>Content</label>
                  <textarea
                    rows='5'
                    className='form-control'
                  defaultValue={singleStory.content} 
                    ref={function (node) {
                      return (content = node);
                    }}
                  />
                </div>
                <div className='btn-group'>
                  <button type='submit' className='btn btn-primary'>
                    Update
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={function () {
                     handleCancel(singleStory.id);
                    }}>
                    Cancel
                  </button>
                </div>
              </form>
              {loading && <p>Loading...</p>}
              {error && <p>Error : {error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    </div>
  );
}

export default StoryEdit;
