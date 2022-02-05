import { React, useState, useEffect } from "react";
import { Image, Form } from "semantic-ui-react";

function StoryInput(props) {
  const selectedPage = props.selectedPage;
  const varUpdated = props.variablesUpdated;
  const varModel = props.variablesModel;

  const [variablesModel, setVariablesModel] = useState(varModel);
  const [dynamicContent, setDynamicContent] = useState(getDynamicContent());

  useEffect(() => {
    setDynamicContent(getDynamicContent());
  }, [getDynamicContent]);

  function getDynamicContent() {
    let dynContent = selectedPage.content;
    selectedPage.variables.forEach((variable) => {
      dynContent = dynContent.replace(
        new RegExp(variable.name, "g"),
        getVarValue(selectedPage.id, variable.id)
      );
    });
    return dynContent;
  }

  function getVarValue(pageId, varId) {
    return variablesModel
      .find((p) => p.pageId === pageId)
      .variables.find((v) => v.varId === varId).value;
  }

  function getUpdatedVarModel(pageId, varId, value) {
    return [...variablesModel].map((p) => {
      p.variables = [...p.variables]; // clone variables

      if (p.pageId === pageId) {
        // Update variable value
        p.variables.find((v) => v.varId === varId).value = value;
        // Update dynamic content
        p.content = getDynamicContent();
      }
      return p;
    });
  }

  // Dynamically changes the values of the text input fields based on the selected page

  let variables = selectedPage.variables.map((variable) => {
    return (
      <div key={variable.id} className='nine wide field'>
        <label>{variable.description}:</label>
        <input
          type='text'
          /*  className='form-control' */
          value={getVarValue(selectedPage.id, variable.id)}
          onChange={(e) => {
            setVariablesModel(
              getUpdatedVarModel(selectedPage.id, variable.id, e.target.value)
            );
            varUpdated(variablesModel);
          }}
          placeholder={variable.description}></input>
      </div>
    );
  });

  return (
    <div className='ui two column divided grid'>
      <div className='stretched row'>
        <div className='column'>
          <div className='ui segment'>
            <Image src={selectedPage.image} alt='school' />
          </div>
        </div>
        <div className='column'>
          <div className='ui form'>
            {variables}
            <div className='ui message nine wide field'>
              <div className='header'>Preview</div>
              <div
                className=''
                dangerouslySetInnerHTML={{ __html: dynamicContent }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryInput;
