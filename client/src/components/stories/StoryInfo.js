import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STORY, GET_STORIES } from "../../utils/queries";
import { DELETE_STORY } from "../../utils/mutations";
import { Grid, Image } from "semantic-ui-react";

import Auth from "../../utils/auth";

function StoryInfo() {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const singleStory = data?.story || {};
  const canEdit = singleStory.userId === Auth.getProfile().data._id;

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
    <div className='ui container'>
      <h2>{singleStory.title}</h2>
      {singleStory.pages.map((page) => {
        return (
          <Grid key={page.id} columns={2} padded>
            <Grid.Row>
              <div id='pageContent' className='ui raised segment'>
                <div className='item'>
                  <div className='ui medium image'>
                    <Image
                      className='img'
                      size='large'
                      centered
                      src={page.image}
                      alt='pageimage'
                    />
                  </div>
                </div>
                <div className='item'>
                  <div id='pContent' className=''>
                    <p>{page.content}</p>
                  </div>
                </div>
              </div>
            </Grid.Row>
          </Grid>
        );
      })}

      <p className='btn-group'>
        {canEdit ? (
          <div>
            <Link
              to={`/stories/${singleStory.id}/edit`}
              className='btn btn-info'>
              Edit
            </Link>
            <button
              className='btn btn-danger'
              onClick={() => {
                deleteStory({});
                navigate("/stories/");
              }}>
              Delete
            </button>
          </div>
        ) : (
          <p></p>
        )}

        <Link to='/stories' className='btn btn-secondary'>
          Close
        </Link>
      </p>
      <hr />
    </div>
  );
}

export default StoryInfo;
