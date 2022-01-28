import { React, useState } from "react";

const templates = require("./templates.json");

function StoryContent(props) {
  let selectedTemplate = templates[0];

  const { storyContent } = props; 

  console.log(selectedTemplate + "From storyContent");

  const [selectedPage, setSelectedPage] = useState(selectedTemplate.pages[0]);
  const [dynamicContent, setDynamicContent] = useState(storyContent);

  console.log(selectedTemplate);
  let pageVariables = selectedTemplate.pages.flatMap((page) =>
    page.variables.map((v) => ({ id: page.id + "-" + v.id, value: "1" }))
  );
  const [variableValues, setVariableValues] = useState(pageVariables);
  console.log(variableValues);

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


  return (
    <div>
      <p>Page content here:</p>
    
      <div dangerouslySetInnerHTML={{ __html: dynamicContent }}>
      </div>
    </div>
  );
}

export default StoryContent;
