import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";
import StoryPages from "./StoryPages";
import StoryInput from "./StoryInput";
import Navigation from "../pages/Navigation";
import { Button, Form, Grid } from "semantic-ui-react";

import Auth from "../../utils/auth";

const templates = require("./templates.json");

function StoryAdd() {
  const navigate = useNavigate();
  let title;
  let id = useParams();

  let selectedTemplate = templates.find((f) => f.id === id.id);

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);

  function createPageVariablesModel(template) {
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

  const [pageVariablesModel, setPageVariablesModel] = useState(
    createPageVariablesModel(selectedTemplate)
  );

  function pageSelected(page) {
    setSelectedPage(page);
  }

  function variablesUpdated(varModel) {
    setPageVariablesModel(varModel);
  }

  function saveStory() {
    const pagesToSave = selectedTemplate.pages.map((p) => {
      let pageVariables = pageVariablesModel.find((f) => f.pageId === p.id);
      return {
        pageId: p.id,
        image: pageVariables.image,
        content: pageVariables.content,
        variables: p.variables.map((v) => {
          return {
            varId: v.id,
            name: v.name,
            description: v.description,
            value: pageVariables.variables.find((f) => f.varId === v.id).value,
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
        userId: Auth.getProfile().data._id,
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
    <div className='ui container'>
      <Navigation />
      <Grid container stackable columns={2} >
        <Grid.Column width={4}>
          <div className='ui container'>
            <StoryPages
              pages={selectedTemplate.pages}
              pageSelected={pageSelected}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <div className='ui stackable segment'>
            <Form size="tiny"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <div className='ui header'>
                <label>Title:</label>
              </div>
              <div>
                <input
                  type='text'
                  ref={function (node) {
                    return (title = node);
                  }}
                />
              </div>
              <Grid stackable columns={1}>
                <Grid.Column >
                  <StoryInput 
                    selectedPage={selectedPage}
                    variablesModel={pageVariablesModel}
                    variablesUpdated={variablesUpdated}
                  />
                  <div>
                    <Button
                      className='ui button'
                      type='submit'
                      id='btnSubmit'
                      onClick={saveStory}>
                      Submit
                    </Button>
                    <Link className='ui button' to='/' id='btnCancel'>
                      Cancel
                    </Link>
                  </div>
                  </Grid.Column>
              </Grid>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default StoryAdd;
