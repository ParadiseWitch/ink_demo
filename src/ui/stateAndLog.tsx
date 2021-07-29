import { Box } from "ink";
import Markdown from "ink-markdown";
import { Tab, Tabs } from "ink-tab";
import React, { useState } from "react";
import { FullScreen } from "./full-screen";
import { Log } from "./log";
import { State } from "./state";

const ACTIVE_TAB_NAME = {
  STATE: "执行状态",
  LOG: "执行日志",
};

const StateAndLog = () => {
  const [activeTab, setActiveTab] = useState<string>(ACTIVE_TAB_NAME.STATE);
  const handleTabChange = (name) => {
    setActiveTab(name);
  };
  return (
    <FullScreen>
      <Tabs onChange={handleTabChange}>
        <Tab name={ACTIVE_TAB_NAME.STATE}>{ACTIVE_TAB_NAME.STATE}</Tab>
        <Tab name={ACTIVE_TAB_NAME.LOG}>{ACTIVE_TAB_NAME.LOG}</Tab>
      </Tabs>
      <Box>
        <Box display={activeTab === ACTIVE_TAB_NAME.STATE ? "flex" : "none"}>
          <State />
        </Box>
        <Box display={activeTab === ACTIVE_TAB_NAME.LOG ? "flex" : "none"}>
          <Log />
        </Box>
      </Box>
    </FullScreen>
  );
};

export default StateAndLog;
