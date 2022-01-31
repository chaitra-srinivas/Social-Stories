import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STORY, GET_STORIES } from "../../utils/queries";
import { DELETE_STORY } from "../../utils/mutations";

function StoryInfo() {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_STORY, { variables: { id: id }});
  const singleStory = data?.story || {};
  
  const [deleteStory, { dataLoading, error }] = useMutation(DELETE_STORY, {
    variables: { id: singleStory.id },
     refetchQueries: [GET_STORIES], 
    /*  update(cache, { data: { deleteStory } }) {
      try {
        const stories = cache.readQuery({ query: GET_STORIES });
        cache.writeQuery({
          query: GET_STORIES,
          data: stories,
        });
      } catch (e) {
        console.log(e);
      }
    },  */
  });

  const navigate = useNavigate();
  if (loading || dataLoading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <h2>{singleStory.title}</h2>
      {singleStory.pages.map((page) => {
        return (
          <div key={page.id} className='card mb-3 card-body bg-light p-2'>
            <p>
              <h6>{page.content}</h6>
            </p>
            <img
              src={page.image}
              alt='pageimage'
              style={{ width: "200px", height: "150px" }}
            />
          </div>
        );
      })}
      <p className='btn-group'>
        <Link to={`/stories/${singleStory.id}/edit`} className='btn btn-info'>
          Edit
        </Link>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteStory({
            });
           navigate("/stories/");
          }}>
          Delete
        </button>
        <Link to='/stories' className='btn btn-secondary'>
          Close
        </Link>
      </p>
      <hr />
    </div>
  );
}

export default StoryInfo;
