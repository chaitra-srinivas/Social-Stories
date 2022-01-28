import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../../utils/queries";

function StoryList() {
  const { loading, data } = useQuery(GET_STORIES);

  const storyList = data?.stories || [];

  console.log(storyList);
  return (
    <div>
      <h2>
        Stories
        <Link to='/stories/new' className='btn btn-primary float-right'>
          Create Story
        </Link>
      </h2>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <ul>
          {storyList.map((story) => {
            return (
              <div key={story.id}>
                <hr />
                <h4>
                  <Link to={`/stories/${story.id}`}>{story.title}</Link>
                </h4>
                <small>id: {story.id}</small>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default StoryList;
