import React, { FC, useState } from "react";
import chalk from "chalk";
import App from "./ui";
import { exec } from "./utils";
import { Build } from "./build/build";
import { subProcessOut } from "./subProcessOut";
import childProcess from "child_process";
import stripAnsi from "strip-ansi";
import { Log } from "./ui/log";
import { ScrollView } from "./ui/scroll-view";
import { Box, Text, Newline, useInput, render } from "ink";
import { FullScreen } from "./ui/full-screen";

const Test: FC = () => {

  const [data, setData] = useState<string[]>([
    "1safsadfgsdgdhgd",
    "2ftdjgykkiupsdgdfhd",
    "3safsadfgsdgdhgd",
    "4sdhgdhtuytiuyouipipio[",
    "5fgjhofghjkhguolui",
    "6oi[cxfhbfgh,i;io;i;",
    "7ftdjgykkiupsdgdfhd",
    "8ftdjgykkiupsdgdfhd",
    "9asdagykasfdapsdgdfhd",
    "10||7igfjgdjafupsdgdfhd",
    "11||324fjgdjafupsdgdfhd",
    "12sdgigfjgdjafupsdgdfhd",
    "13dsfhgdfoigfjgdjafupsdgdfhd",
    "14||6utufjgdjafupsdgdfhd",
    "15||6utufjgdjafupsdgdfhd",
    "16||6utufjgdjafupsdgdfhd",
    "17||6utufjgdjafupsdgdfhd",
    "18||6utufjgdjafupsdgdfhd",
    "19||6utufjgdjafupsdgdfhd",
    "20||6utufjgdjafupsdgdfhd",
    "21||6utufjgdjafupsdgdfhd",
  ]);

  let index = 22;
  setTimeout(() => {
    let newData = [...data];
    newData.push(index + "asfafsdhgdfhfj");
    setData(newData);
    index++;
  }, 100);
  return (
    <Box>
      <ScrollView
        data={data}
        limit={5} />
    </Box>
  );
}

render(
  <Test></Test>
);
