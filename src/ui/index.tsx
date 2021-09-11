import { Box } from "ink";
import Markdown from "ink-markdown";
import SelectInput from "ink-select-input";
import React, { FC, useContext, useState } from "react";
import { envs, modules } from "../config";
import { EventData, FileCopyConsumer } from "../consumers/FileCopyConsumer";
import { Context } from "./context";
import { FullScreen } from "./full-screen";
import StateAndLog from "./stateAndLog";
import dedent from "dedent";
import { Build } from "../build/build";

interface AppProps {
  fileConsumer: FileCopyConsumer;
}

class option {
  public label: string;
  public value: string;
  constructor(label: string, value?: string) {
    if (!value) this.label = this.value = label;
    this.label = label;
    this.value = value;
  }
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
          <Markdown>{NAV_TEXT}</Markdown>
        </Box>
        <StateAndLog></StateAndLog>
      </>
    ),
  };

  // TODO 有机会做成一次选多个module
  const [selectEnv, setSelectEnv] = useState("dev");
  const [selectmodule, setSelectModule] = useState(modules[0]);
  const [curCompName, setCurCompName] = useState("selectEnv");
  const context = useContext(Context);


  const NAV_TEXT: string = dedent`
		\`> ${selectEnv} > ${selectmodule}\`    功能概览如下(按 **Tab** 切换):
	`;
  const handleEnvSelect = (item: option) => {
    setSelectEnv(item.label);
    setCurCompName("selectModules");
  };
  const handleModuleSelect = (item: option) => {
    setSelectModule(item.label);
    let build = new Build(selectEnv);
    build.setBuildModules([selectmodule]);
    setCurCompName("showStateAndLog");

    execProcess(build);
  };
  async function execProcess(build: Build) {
    try {
      const log = await build.dup2targetDir();
      console.log("log:", log.split("\n"));
      
      // FIXME: 没有通知到
      context?.fileConsumer.onDone({
        kind: "finish",
        payload: log.split("\n"),
      });
      // await exec(`pause`);
    } catch (error) {
      throw new Error("执行命令报错\t" + error);
    }
  }
  return (
    <Context.Provider value={{ fileConsumer }}>
      <FullScreen>
        {curCompName == "selectEnv" && <comps.selectEnv />}
        {curCompName == "selectModules" && <comps.selectModules />}
        {curCompName == "showStateAndLog" && <comps.showStateAndLog />}
      </FullScreen>
    </Context.Provider>
  );
};

export default App;
