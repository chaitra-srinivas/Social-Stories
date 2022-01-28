import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { GET_STORY } from "../../utils/queries";
import { UPDATE_STORY } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

function StoryEdit(props) {
  let { id } = useParams();

  const navigate = useNavigate();

  let title, content;
  function handleCancel(id) {
    navigate(`/stories/${id}`);
  }

  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const [updateStory, { dataloading, error }] = useMutation(UPDATE_STORY);
  const singleStory = data?.story || {};

  console.log(singleStory.pages[0].variables);

  if (loading || dataloading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  function editStory() {
    const pagesToUpdate = singleStory.pages.map((p) => {
      return {
        id: p.id,
        content: p.content,
        variables: p.variables.map((v) => {
          return {
            id: v.id,
            name: v.name,
            description: v.description,
            value: v.value,
          };
        }), 
      };
    });

     updateStory({
      variables: {
        id: singleStory.id,
        templateId: "t001",
        title: title.value,
        pages: pagesToUpdate,
      },
      //  refetchQueries: [{ query: GET_STORIES }],
    }); 
  }

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
                  /*  updateStory({
                    variables: {
                      id: singleStory.id,
                      templateId: singleStory.templateId,
                      title: title.value,
                      pages: singleStory.pages,
                    },
                  }); */
                  navigate(`/stories/${singleStory.id}`);
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
                {singleStory.pages.map((page) => {
                  return (
                    <div key={page.id} className='form-group'>
                     <div>
                       <label></label>
                     </div>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={page.content}
                        ref={function (node) {
                          return (content = node);
                        }}
                      />
                    </div>
                  );
                })}

                <div className='btn-group'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={editStory}>
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
