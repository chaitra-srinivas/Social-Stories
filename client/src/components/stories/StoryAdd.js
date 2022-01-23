import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";
const templates = require("./templates.json");

function StoryAdd(props) {
  let { title, content } = useParams;
  let selectedTemplate = templates[0];

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  const [dynamicContent, setDynamicContent] = useState("");

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

  console.log(selectedTemplate);
  let pageVariables = selectedTemplate.pages.flatMap((page) =>
    page.variables.map((v) => ({ id: page.id + "-" + v.id, value: "1" }))
  );
  const [variableValues, setVariableValues] = useState(pageVariables);
  console.log(variableValues);

  const [createStory, { data, loading, error }] = useMutation(CREATE_STORY);

  if (loading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  let pages = selectedTemplate.pages.map((page) => {
    return (
      <div key={page.id}>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setSelectedPage(page);
            prepareDynamicContent();
          }}>
          {page.title}
        </a>{" "}
        <br />
        <span>{page.description}</span> <br />
      </div>
    );
  });

  let variables = selectedPage.variables.map((variable) => {
    return (
      <div key={variable.id}>
        <input
          value={
            variableValues.find(
              (f) => f.id === selectedPage.id + "-" + variable.id
            ).value
          }
          onChange={(e) => {
            setVariableValues(
              [...variableValues].map((m) => {
                if (m.id === selectedPage.id + "-" + variable.id) {
                  return {
                    id: selectedPage.id + "-" + variable.id,
                    value: e.target.value,
                  };
                } else {
                  return m;
                }
              })
            );
            prepareDynamicContent();
          }}
          placeholder={variable.description}></input>
      </div>
    );
  });
  return (
    <div>
      <form
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
          <label>Content:</label>
          <textarea
            rows='5'
            className='form-control'
            ref={function (node) {
              return (content = node);
            }}
          />
          {selectedPage.title}
          {pages}
          {variables}
          {dynamicContent}
        </div>

        <p className='btn-group'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <Link to='/stories' className='btn btn-secondary'>
            Cancel
          </Link>
        </p>
      </form>
    </div>
  );
}

export default StoryAdd;
