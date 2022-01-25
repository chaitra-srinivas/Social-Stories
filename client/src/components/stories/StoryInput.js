import { React, useState } from "react";

const templates = require("./templates.json");

function StoryInput(props) {
  let selectedTemplate = templates[0];

  const {pageInput} = props;

  let pageVariables = selectedTemplate.pages.flatMap((page) =>
    page.variables.map((v) => ({ id: page.id + "-" + v.id, value: v.description }))
  );
  const [variableValues, setVariableValues] = useState(pageVariables);


 // Dynamically changes the values of the text input fields based on the selected page

  let pages = pageInput.map((variable) => {
    return (
      <div key={variable.id} className='form-group'>
        <label>{variable.description}:</label>
        <input
        type='text'
        className='form-control'
          value={
            variableValues.find(
              (f) => f.id === pageInput.id + "-" + variable.id
            )
          }
          onChange={(e) => {
            setVariableValues(
              [...variableValues].map((m) => {
                if (m.id === pageInput.id + "-" + variable.id) {
                  return {
                    id: pageInput.id + "-" + variable.id,
                    value: e.target.value,
                  };
                } else {
                  return m;
                }
              })
            );
          }}
          placeholder={variable.description}></input>
      </div>
    );
  });

  return (
    <div className='form-group'> 
       {pages}  
    </div>
  );
}

export default StoryInput;
