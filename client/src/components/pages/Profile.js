import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MY_STORIES } from "../../utils/queries";
import Navigation from "../pages/Navigation";
import { List } from "semantic-ui-react";
import Auth from "../../utils/auth";

function getTemplateDescription(story) {
  if (story.templateId === "t001") {
    return {
      description: "A transition story to help student with change",
      icon: "graduation cap",
    };
  } else if (story.templateId === "t002") {
    return { description: "A social story about excursions", icon: "bus" };
  } else {
    return "";
  }
}

function Profile() {
  const { loading, data } = useQuery(GET_MY_STORIES, {
    variables: { userId: Auth.getProfile().data._id },
  });

  const storyList = data?.mystories || [];

  if (loading) return "Loading...";

  return (
    <div>
      <Navigation />
      <h2>My Stories</h2>
      {!storyList.length ? (
        <div id='storyList'>
          <p>You have not created any stories yet.</p>{" "}
        </div>
      ) : (
        <div>
          {storyList.map((story) => {
            return (
              <List id='storyList'>
                <List.Item key={story.pageId}>
                  <List.Icon name={getTemplateDescription(story).icon} />
                  <List.Content>
                    <List.Header>
                      <Link to={`/stories/${story.id}`}>{story.title}</Link>
                    </List.Header>
                    <List.Description>
                      {getTemplateDescription(story).description}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
