import { React, useState } from "react";
import { GET_STORY } from "../../utils/queries";
import { UPDATE_STORY } from "../../utils/mutations";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form} from "semantic-ui-react";

import Auth from "../../utils/auth";

import StoryPages from "./StoryPages";
import StoryInput from "./StoryInput";
import Navigation from "../pages/Navigation";

const templates = require("./templates.json");

function StoryEdit(props) {
  let { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });

  const [updateStory, { dataloading, error }] = useMutation(UPDATE_STORY, {
    update(cache, { data: { updateStory } }) {
      try {
        cache.readQuery({ query: GET_STORY });
        cache.writeQuery({
          query: GET_STORY,
          data: { story: updateStory },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const story = data?.story || {};
  const canEdit = story.userId === Auth.getProfile().data._id;

  let selectedTemplate = templates.find((f) => f.id === story.templateId);

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  const [variablesModel, setVariablesModel] = useState(
    createVariablesModel(story)
  );
  const [title, setTitle] = useState(story.title);

  if (loading || dataloading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  function createVariablesModel(story) {
    return story.pages.map((page) => {
      return {
        pageId: page.pageId,
        content: page.content,
        image: page.image,
        variables: page.variables.map((variable) => ({
          varId: variable.varId,
          value: variable.value,
        })),
      };
    });
  }

  function pageSelected(page) {
    setSelectedPage(page);
  }

  function variablesUpdated(varModel) {
    setVariablesModel(varModel);
  }

  function editStory() {
    const pagesToUpdate = selectedTemplate.pages.map((p) => {
      let pageVariablesModel = variablesModel.find((f) => f.pageId === p.id);
      return {
        pageId: p.id,
        image: pageVariablesModel.image,
        content: pageVariablesModel.content,
        variables: p.variables.map((v) => {
          return {
            varId: v.id,
            name: v.name,
            description: v.description,
            value: pageVariablesModel.variables.find((f) => f.varId === v.id)
              .value,
          };
        }),
      };
    });

    updateStory({
      variables: {
        id: story.id,
        templateId: story.templateId,
        title: title,
        pages: pagesToUpdate,
        userId: Auth.getProfile().data._id
      },
    });
    navigate("/stories/");
  }

  return (
    <div>
      <Navigation />
      <div className='ui bottom attached segment pushable'>
        <StoryPages
          pages={selectedTemplate.pages}
          pageSelected={pageSelected}
        />
     
      <div className='pusher'>
          <div className='ui basic segment'>
      <Form
        size="large"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <div className='ui header'>
          <label>Title:</label>
          <input
            type='text'
            className='twelve wide field'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className='ui basic segment'>
          <StoryInput
            selectedPage={selectedPage}
            variablesModel={variablesModel}
            variablesUpdated={variablesUpdated}
          />
        </div>
        <div>
          <p className='btn-group'>
            {canEdit ? (
              <button
                type='submit'
                className='btn btn-primary'
                onClick={editStory}>
                Update
              </button>
            ) : (
              <p></p>
            )}

            <Link to='/stories' className='btn btn-secondary'>
              Cancel
            </Link>
          </p>
        </div>
      </Form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default StoryEdit;
