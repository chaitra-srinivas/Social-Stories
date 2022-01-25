import { React, useState } from "react";

const templates = require("./templates.json");

function StoryInput() {
  let selectedTemplate = templates[0];

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  const [dynamicContent, setDynamicContent] = useState("");

 // console.log(selectedTemplate);
  let pageVariables = selectedTemplate.pages.flatMap((page) =>
    page.variables.map((v) => ({ id: page.id + "-" + v.id, value: v.description }))
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

 // Dynamically changes the values of the text input fields based on the selected page

  let pages =selectedPage.variables.map((variable) => {
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
        //    prepareDynamicContent();
          }}
          placeholder={variable.description}></input>
      </div>
    );
  });

  let variables = selectedTemplate.pages.map((page) => {
    return (
      <div key={page.id}>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setSelectedPage(page);
           //prepareDynamicContent();
          }}>
          {page.title}
        </a>
        <br />
        <span>{page.description}</span> <br />
      </div>
    );
  });  

  return (
    <div>
       {pages} 
       {/*  {variables} */}
 {/*   {dynamicContent}  */}
      
    </div>
  );
}

export default StoryInput;
