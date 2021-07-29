import { Box } from "ink";
import Markdown from "ink-markdown";
import SelectInput from "ink-select-input";
import React, { FC, useState } from "react";
import { envs, modules } from "../config";
import { FileCopyConsumer } from "../consumers/FileCopyConsumer";
import { Context } from "./context";
import { FullScreen } from "./full-screen";
import option from "./option/option";
import StateAndLog from "./stateAndLog";
import dedent from "dedent";

interface AppProps {
  fileConsumer: FileCopyConsumer;
}

const build_envs = [];
Object.keys(envs).map((k, index) => {
  build_envs.push(new option(k, index.toString()));
});

const build_modules = modules.map(
  (item, index) => new option(item, index.toString())
);

const App: FC<AppProps> = ({ fileConsumer }) => {
  const comps = {
    selectEnv: () => (
      <FullScreen>
        <SelectInput
          items={build_envs}
          onSelect={handleEnvSelect}
        ></SelectInput>
      </FullScreen>
    ),
    selectModules: () => (
      <FullScreen>
        <SelectInput
          items={build_modules}
          onSelect={handleModuleSelect}
        ></SelectInput>
      </FullScreen>
    ),
    showStateAndLog: () => (
      <>
        <Box>
          <Markdown>{WELCOME_TEXT}</Markdown>
        </Box>
        <StateAndLog></StateAndLog>
      </>
    ),
  };

  // TODO 有机会做成一次选多个module
  const [selectEnv, setSelectEnv] = useState("dev");
  const [selectmodule, setSelectModule] = useState(modules[0]);
  const [curCompName, setCurCompName] = useState("selectEnv");

  const WELCOME_TEXT: string = dedent`
		>${selectEnv}    功能概览如下(按 **Tab** 切换):
	`;
  const handleEnvSelect = (item: option) => {
    setSelectEnv(item.value);
    setCurCompName("selectModules");
  };
  const handleModuleSelect = (item: option) => {
    setSelectModule(item.value);
    setCurCompName("showStateAndLog");
  };
  return (
    <Context.Provider value={{ fileConsumer }}>
      {curCompName == "selectEnv" && <comps.selectEnv />}
      {curCompName == "selectModules" && <comps.selectModules />}
      {curCompName == "showStateAndLog" && <comps.showStateAndLog />}
    </Context.Provider>
  );
};

export default App;
