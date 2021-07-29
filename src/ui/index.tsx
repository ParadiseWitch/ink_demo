import React, { FC } from "react";
import { FileCopyConsumer } from "../consumers/FileCopyConsumer";
import { Context } from "./context";
import StateAndLog from "./stateAndLog";

interface AppProps {
  fileConsumer: FileCopyConsumer;
}
const App: FC<AppProps> = ({ fileConsumer }) => {
  return (
    <Context.Provider value={{ fileConsumer }}>
      <StateAndLog />
    </Context.Provider>
  );
};

export default App;
