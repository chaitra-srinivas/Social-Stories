import { React, useState, useEffect } from "react";
import StoryContent from "./StoryContent";

function StoryInput(props) {
  const selectedPage = props.selectedPage;
  const varUpdated = props.variablesUpdated;
  const varModel = props.variablesModel;

  console.log(selectedPage.image);

  const [variablesModel, setVariablesModel] = useState(varModel);
  const [dynamicContent, setDynamicContent] = useState(getDynamicContent());

  useEffect(()=>{
    setDynamicContent(getDynamicContent());
  })

  function getDynamicContent(){
  
    let dynContent = selectedPage.content;  
    selectedPage.variables.forEach(variable => {
      dynContent = dynContent.replace(variable.name, getVarValue(selectedPage.id, variable.id));
      });
      return dynContent;   
  }

  function getVarValue(pageId, varId) {
    return variablesModel.find((f) => f.pageId === pageId && f.varId === varId).value;
  }

  function getUpdatedVarModel(pageId, varId, value) {
    return [...variablesModel].map((m) => {
      if (m.pageId === pageId && m.varId === varId) {
        m.value = value;
        return m;
      } else {
        return m;
      }
    });
  }

  // Dynamically changes the values of the text input fields based on the selected page

  let variables = selectedPage.variables.map((variable) => {
    return (
      <div key={variable.id} className='form-group'>
        <label>{variable.description}:</label>
        <input
          type='text'
          className='form-control'
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

  return <div>
   <img src={selectedPage.image} style={{width:"200px", height:"150px"}} alt="school" /> 
    <div className='form-group'>{variables}</div>
    <div dangerouslySetInnerHTML={{ __html: dynamicContent }}></div> 
    </div>;
}

export default StoryInput;
