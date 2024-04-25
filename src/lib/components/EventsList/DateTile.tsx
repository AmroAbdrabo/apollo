import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  timestamp: number;
}

export const DateTile: React.FC<Props> = ({ timestamp }) => {
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("Jan");

  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp);
      setDay(date.getDate().toString());
      setMonth(date.toLocaleString("default", { month: "short" }));
    }
  }, [timestamp]);

  return (
    <Flex
      width="45px"
      height="45px"
      bg={lightMode ? "white" : "gray.700"}
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderRadius={10}
      pos="absolute"
      bottom="8px"
      left="8px"
    >
      <Text fontWeight={600} fontSize={14}>
        {day}
      </Text>
      <Text fontSize={12} marginTop="-5px">
        {month}
      </Text>
    </Flex>
  );
};
