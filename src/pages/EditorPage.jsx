import EditorButton from "../components/EditorMenu/EditorButton";
import EditorMenu from "../components/EditorMenu/EditorMenu";
import {useRef, useState} from "react";
import Module from "../models/module.js";
import VortexModuleConverter from "../services/vt-converter";
import ModuleEditor from "../components/ModuleEditor/ModuleEditor.jsx";

function EditorPage() {
  const fileLoaderInput = useRef(null);
  const [currentModule, updateCurrentModule] = useState(new Module());

  function newModule() {
    updateCurrentModule(new Module());
  }

  function loadModule() {
    fileLoaderInput.current.click();
  }

  async function handleFileSelect(event) {
    const file = event.target.files[0];
    const converter = new VortexModuleConverter();

    const lemonModule = await converter.convertToLemonModule(new Blob([file], {type: file.type}));

    updateCurrentModule(lemonModule);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <EditorMenu>
          <EditorButton onClick={newModule}>New Track</EditorButton>
          <EditorButton onClick={loadModule}>Load Module</EditorButton>
        </EditorMenu>
        <ModuleEditor currentModule={currentModule}/>
      </div>
      <input
        ref={fileLoaderInput}
        hidden
        type="file"
        accept=".vt2,.pt3"
        onChange={handleFileSelect}
      />
    </>
  );
}

export default EditorPage;