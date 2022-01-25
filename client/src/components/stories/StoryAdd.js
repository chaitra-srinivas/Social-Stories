import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";
import StoryPages from "./StoryPages";
import StoryInput from "./StoryInput";
import StoryContent from "./StoryContent";

const templates = require("./templates.json");

function StoryAdd() {
  let { title, content } = useParams;

  let selectedTemplate = templates[0];

  let storyPages = selectedTemplate.pages;

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  
  let pageInput = selectedPage.variables;
 
  const [dynamicContent, setDynamicContent] = useState("");

  // console.log(selectedTemplate);
  let pageVariables = selectedTemplate.pages.flatMap((page) =>
    page.variables.map((v) => ({
      id: page.id + "-" + v.id,
      value: v.description,
    }))
  );
  const [variableValues, setVariableValues] = useState(pageVariables);
  //console.log(variableValues);

  function prepareDynamicContent() {
    let content = selectedPage.content;
    selectedPage.variables.forEach((variable) => {
      content = content.replace(
        variable.name,
        variableValues.find((f) => f.id === selectedPage.id + "-" + variable.id)
          .value
      );
    });
    setDynamicContent(content);
  }

  
  // StoryAdd

  const [createStory, { loading, error }] = useMutation(CREATE_STORY);

  if (loading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <div style={{ float: "left", width: "300px" }}>
        <StoryPages pageLinks={storyPages} />
      </div>
      <form
        style={{ float: "right", width: "700px" }}
        onSubmit={(e) => {
          e.preventDefault();
          createStory({
            variables: { title: title.value, content: content.value },
            refetchQueries: [{ query: GET_STORIES }],
          });
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
          <StoryInput pageInput={pageInput} />
        </div>
        <div className='form-group'>
          <label>Content:</label>
          <textarea
            rows='5'
            className='form-control'
            ref={function (node) {
              return (content = node);
            }}
          />
        </div>

        <div>
          <p className='btn-group'>
            <button type='submit' className='btn btn-primary'>
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
