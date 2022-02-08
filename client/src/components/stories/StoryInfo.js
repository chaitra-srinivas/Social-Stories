import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STORY, GET_STORIES, GET_MY_STORIES } from "../../utils/queries";
import { DELETE_STORY } from "../../utils/mutations";
import { Image, Button } from "semantic-ui-react";

import Navigation from "../pages/Navigation";

import Auth from "../../utils/auth";

function StoryInfo() {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const singleStory = data?.story || {};
  const canEdit = singleStory.userId === Auth.getProfile().data._id;

  const [deleteStory, { dataLoading, error }] = useMutation(DELETE_STORY, {
    variables: { id: singleStory.id },
    refetchQueries: [GET_STORIES, GET_MY_STORIES],
    update(cache, { data: { deleteStory } }) {
      try {
        const stories = cache.readQuery(
          { query: GET_STORIES,
           GET_MY_STORIES }
        );
        cache.writeQuery({
          query: GET_STORIES,
          GET_MY_STORIES,
          data: stories,
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const navigate = useNavigate();
  if (loading || dataLoading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className='ui container'>
      <Navigation /> <h2>{singleStory.title}</h2>
      {singleStory.pages.map((page) => {
        return (
          <div className='ui two column  grid raised segment' key={page.id}>
            <div className='column'>
              <div>
                <Image
                  className='img'
                  size='large'
                  centered
                  src={page.image}
                  alt='pageimage'
                />
              </div>
            </div>
            <div id='pContent' className='column'>
              <p>{page.content}</p>
            </div>
          </div>
        );
      })}
      <div>
        {canEdit ? (
          <Link
            to={`/stories/${singleStory.id}/edit`}
            id='btnSubmit'
            className='ui button'>
            Edit
          </Link>
        ) : (
          <div></div>
        )}
        {canEdit ? (
          <Button
            className='ui button'
            id='btnDelete'
            onClick={() => {
              deleteStory({});
              navigate("/stories/");
            }}>
            Delete
          </Button>
        ) : (
          <div></div>
        )}
        <Link to='/stories' id='btnCancel' className='ui button'>
          Close
        </Link>
      </div>
    </div>
  );
}

export default StoryInfo;
