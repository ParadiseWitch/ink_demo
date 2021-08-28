import { FC, useEffect, useState } from "react";
import { Box, Text, Newline, useInput } from "ink";

import React from "react";

const getNumberLen = (number: number): number => {
  return String(number).length;
};

const getMidLine = (startLine: number, endLine: number): number => {
  return Math.round((startLine + endLine) / 2);
};
export const ScrollView: FC<{ data: string[]; limit: number }> = ({
  data,
  limit,
}) => {
  const getEndLine = () => {
    return startLine + limit;
  }
  const [startLine, setStartLine] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(0);
  const [showData, setShowData] = useState<string[]>(
    data.slice(startLine, getEndLine())
  );

  useInput((input, key) => {
    if (key.upArrow) {
      if (cursor <= 0) {
        setCursor(0);
        setStartLine(0);
      } else {
        if (
          startLine > 0 &&
          cursor <= getMidLine(startLine + 1, getEndLine())
        ) {
          setStartLine(startLine - 1);
        }
        setCursor(cursor - 1);
      }
      setShowData(data.slice(startLine, getEndLine()));
    }
    if (key.downArrow) {
      if (cursor >= data.length) {
        setCursor(data.length);
        setStartLine(data.length - limit);
      } else {
        if (getEndLine() < data.length && cursor >= getMidLine(startLine + 1, getEndLine())) {
          setStartLine(startLine + 1);
        }
        setCursor(cursor + 1);
      }
      setShowData(data.slice(startLine, getEndLine()));
    }
  });

  return (
    <>
      <Box borderStyle="round" flexDirection="column">
        {showData.map((item, index) => {
          return (
            <Box key={index}>
              <Text>
               {getEndLine()}
              </Text>
              <Text color="blue">
                {cursor == index + startLine + 1 && ">"}
                {cursor != index + startLine + 1 && "\u00A0"}
                {"\u00A0"}
                {new Array(
                  getNumberLen(data.length) -
                    getNumberLen(index + startLine + 1)
                ).fill("\u00A0")}
                {index + startLine + 1}
                {"|"}
                {"\u000B"}
              </Text>
              <Text>{item}</Text>
            </Box>
          );
        })}
      </Box>
      <Newline />
    </>
  );
};
