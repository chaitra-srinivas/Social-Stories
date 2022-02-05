import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../../utils/queries";
import Navigation from "../pages/Navigation";
import { List } from "semantic-ui-react";

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

function StoryList() {
  const { loading, data } = useQuery(GET_STORIES);

  const storyList = data?.stories || [];
  if (loading) return "Loading...";
  if (!storyList.length) {
    return <h3>No stories added yet.</h3>;
  }

  return (
    <div> 
      <Navigation />
      <h2>Stories</h2>
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
  );
}

export default StoryList;
