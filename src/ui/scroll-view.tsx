import { FC, useEffect, useState } from "react";
import { Box, Text, Newline, useInput } from "ink";

import React from "react";

const getNumberLen = (number) => {
  return String(number).length;
};

export const ScrollView: FC<{ data: string[]; limit: number }> = ({
  data,
  limit,
}) => {
  const [startLine, setStartLine] = useState<number>(0);
  // const [cursor, setCursor] = useState<number>(0);
  const [showData, setShowData] = useState<string[]>(
    data.slice(startLine, startLine + limit)
  );

  useInput((input, key) => {
    if (key.upArrow) {
      if (startLine <= 0) {
        setStartLine(0);
      } else {
        setStartLine(startLine - 1);
      }
      setShowData(data.slice(startLine, startLine + limit));
    }
    if (key.downArrow) {
      console.log(data.length);
      if (startLine + limit >= data.length) {
        setStartLine(data.length - limit);
      } else {
        setStartLine(startLine + 1);
      }
      setShowData(data.slice(startLine, startLine + limit));
    }
  });

  return (
    <>
      <Box borderStyle="round" flexDirection="column">
        {showData.map((item, index) => (
          <Box key={index}>
            <Text color="blue">
              {new Array(
                getNumberLen(data.length) - getNumberLen(index + startLine + 1)
              ).fill("\u00A0")}
              {index + startLine + 1}
              {"|"}
              {"\u000B\u00A0"}
            </Text>
            <Text>{item}</Text>
          </Box>
        ))}
      </Box>
      <Newline />
      <Text color="red">
        {startLine + 1}-{startLine + limit}
      </Text>
    </>
  );
};
