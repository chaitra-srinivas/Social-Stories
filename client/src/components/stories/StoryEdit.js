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

  let selectedTemplate = templates.find((f)=>f.id == story.templateId);

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  const [variablesModel, setVariablesModel] = useState(createVariablesModel(story));
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
      },
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
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
