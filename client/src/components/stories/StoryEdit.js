import { React, useState } from "react";
import { GET_STORY, GET_STORIES } from "../../utils/queries";
import { UPDATE_STORY } from "../../utils/mutations";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import StoryPages from "./StoryPages";
import StoryInput from "./StoryInput";

const templates = require("./templates.json");

function StoryEdit(props) {
  let { id } = useParams();

  const navigate = useNavigate();

  let title, content;
  function handleCancel(id) {
    navigate(`/stories/${id}`);
  }

  const { loading, data } = useQuery(GET_STORY, { variables: { id: id } });
  const [updateStory, { dataloading, error }] = useMutation(UPDATE_STORY);
  const story = data?.story || {};

  let selectedTemplate = templates[0];

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);

  const [variablesModel, setVariablesModel] = useState(
    createVariablesModel(story)
  );

  console.log(variablesModel);

  if (loading || dataloading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  function createVariablesModel(story) {
    return story.pages.map((page) => {
      return {
        id: page.id,
        content: page.content,
        image: page.image,
        variables: page.variables.map((variable) => ({
          id: variable.id,
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
      let pageVariablesModel = variablesModel.find((f) => f.id === p.id);
      return {
        id: p.id,
        image: pageVariablesModel.image,
        content: pageVariablesModel.content,
        variables: p.variables.map((v) => {
          return {
            id: v.id,
            name: v.name,
            description: v.description,
            value: pageVariablesModel.variables.find((f) => f.id === v.id)
              .value,
          };
        }),
      };
    });

    updateStory({
      variables: {
        id: story.id,
        templateId: story.templateId,
        title: story.title,
        pages: pagesToUpdate,
      },
      refetchQueries: [{ query: GET_STORIES }],
    });
    navigate("/stories/");
  }

  return (
    <div>
      <div style={{ float: "left", width: "300px" }}>
        <StoryPages
          pages={selectedTemplate.pages}
          pageSelected={pageSelected}
        />
      </div>
      <form
        style={{ float: "right", width: "700px" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <div className='form-group'>
          <label>Title:</label>
          <input
            type='text'
            className='form-control'
            ref={function (node) {
              return (title = node);
            }} 
            defaultValue={story.title}
          />
        </div>
        <div className='form-group'>
          <StoryInput
            selectedPage={selectedPage}
            variablesModel={variablesModel}
            variablesUpdated={variablesUpdated}
          />
          {/*     <StoryContent dynamicContent={prepareDynamicContent}/> */}
        </div>
        <div>
          <p className='btn-group'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={editStory}>
              Update
            </button>
            <Link to='/stories' className='btn btn-secondary'>
              Cancel
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default StoryEdit;
