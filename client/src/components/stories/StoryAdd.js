import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";
import StoryPages from "./StoryPages";
import StoryInput from "./StoryInput";

const templates = require("./templates.json");

function StoryAdd() {
  const navigate = useNavigate();
  let title;

  let selectedTemplate = templates[1];

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);

  function createVariablesModel(template) {
    return template.pages.map((page) => {
      return {
        pageId: page.id,
        content: page.content,
        image: page.image,
        variables: page.variables.map((variable) => ({
          varId: variable.id,
          value: variable.defaultValue,
        })),
      };
    });
  }

  const [variablesModel, setVariablesModel] = useState(
    createVariablesModel(selectedTemplate)
  );

  function pageSelected(page) {
    setSelectedPage(page);
  }

  function variablesUpdated(varModel) {
    setVariablesModel(varModel);
  }

  function saveStory() {
    const pagesToSave = selectedTemplate.pages.map((p) => {
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
console.log(pagesToSave);
    createStory({
      variables: {
        templateId: selectedTemplate.id,
        title: title.value,
        pages: pagesToSave,
      },
    });
    navigate("/stories");
  }

  // StoryAdd

  const [createStory, { loading, error }] = useMutation(CREATE_STORY, {
    update(cache, { data: { createStory } }) {
      try {
        const { stories } = cache.readQuery({ query: GET_STORIES });
        cache.writeQuery({
          query: GET_STORIES,
          data: { stories: [createStory, ...stories] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  if (loading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

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
          />
        </div>
        <div className='form-group'>
          <StoryInput
            selectedPage={selectedPage}
            variablesModel={variablesModel}
            variablesUpdated={variablesUpdated}
          />
        </div>
        <div>
          <p className='btn-group'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={saveStory}>
              Submit
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

export default StoryAdd;
