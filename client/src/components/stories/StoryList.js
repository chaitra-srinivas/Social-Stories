import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../../utils/queries";

function StoryList() {
  const { loading, data } = useQuery(GET_STORIES);

  const storyList = data?.stories || [];
  if (loading) return "Loading...";
  if (!storyList.length) {
    return <h3>No stories added yet.</h3>;
  }

  return (
    <div>
      <h2>Stories</h2>
      <ul>
        {storyList.map((story) => {
          return (
            <div key={story.id} className='card mb-3 card-body bg-light '>
              <hr />
              <h4>
                <Link to={`/stories/${story.id}`}>{story.title}</Link>
              </h4>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default StoryList;
