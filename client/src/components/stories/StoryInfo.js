import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import { GET_STORY, GET_STORIES } from "../../utils/queries";
import { DELETE_STORY } from "../../utils/mutations";

function StoryInfo(props) {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const singleStory = data?.story || {};


  if (loading) return "Loading...";

  return (
    <div>
      <h2>{singleStory.title}</h2>
      <small>id: {singleStory.id}</small>
      {singleStory.pages.map((page)=>{
        return (
          <div key={page.id}>
            <p>{page.content}</p>
          </div>
        )
      })}
      <p className='btn-group'>
        <Link to={`/stories/${singleStory.id}/edit`} className='btn btn-info'>
          Edit
        </Link>
        <Mutation mutation={DELETE_STORY}>
          {function (deleteStory, { data }) {
            return (
              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteStory({
                    variables: { id: singleStory.id },
                    refetchQueries: [{ query: GET_STORIES }],
                  });
                  props.history.push("/stories");
                }}>
                Delete
              </button>
            );
          }}
        </Mutation>
        <Link to='/stories' className='btn btn-secondary'>
          Close
        </Link>
      </p>
      <hr />
    </div>
  );
}

export default StoryInfo;
