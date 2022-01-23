import { React , useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../utils/mutations";
import { GET_STORIES } from "../../utils/queries";
const templates = require("./templates.json");

function StoryAdd(props) {
  let { title, content } = useParams;
  let selectedTemplate = templates[0];

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0])

  console.log(selectedTemplate);
  let pageVariables = selectedTemplate.pages.flatMap(
    (page)=>
      page.variables.map((v) => ({ id: page.id + '-' +  v.id, value: "1" }))
     )
 const [variableValues, setVariableValues] = useState(pageVariables)
console.log(variableValues);

  const [createStory, { data, loading, error }] = useMutation(CREATE_STORY);

  if (loading) return "Loading...";
  if (error) return `Submission error! ${error.message}`;

  

  let pages = selectedTemplate.pages.map((page) => {
    return <div key={page.id}>
      <a href="#" onClick={(e)=>{e.preventDefault(); setSelectedPage(page);}}>{page.title}</a> <br/>
      <span>{page.description}</span> <br/>
    </div>;
  });

  let variables = selectedPage.variables.map((variable) => {
    return <div key={variable.id}>
      <input
      value={variableValues.find((f) => f.id === selectedPage.id + '-' + variable.id).value}
      onChange={e => setVariableValues(
            [...variableValues].map( 
              (m) => {
          if (m.id == selectedPage.id + '-' + variable.id) {
            return ({ id: selectedPage.id + '-' + variable.id, value : e.target.value});
          } else 
          {
            return m;
          }

      }) ) }
      placeholder={variable.description}></input>
    </div>;
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

  /* return (
    <Mutation mutation={CREATE_STORY}>
      {function (createStory, { data }) {
        return (
          <div>
            <h4>Add a Social Story</h4>
            <hr />
            <form
              onSubmit={function (event) {
                event.preventDefault();
                createStory({
                  variables: { title: title.value, content: content.value },
                  refetchQueries: [{ query: GET_STORIES }],
                });
                props.history.push("/stories");
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
      }}
    </Mutation>
  ); */
}

export default StoryAdd;
