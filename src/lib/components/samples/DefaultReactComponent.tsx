import { Box, Button, Text } from "@chakra-ui/react";
import type React from "react";
import { useState, useEffect } from "react";

// this interface describes all the props that are passed into the DefaultReactComponent
interface Props {
  title: string;
}

export const DefaultReactComponent: React.FC<Props> = ({ title }) => {
  // simple example for a counter held by a state "<number>" indicates that this state holds a numeric value
  const [count, setCount] = useState<number>(0);

  // useEffect is a function that is called when ever one of its dependecies changes,
  // dependencies are listed in the array [] at the end of the function
  // if left blank the useEffect function is executed once, at the time the component mounts
  useEffect(() => {
    setCount(0);
  }, []);

  return (
    <Box>
      <Text>{title}</Text>
      <Text>{count}</Text>
      <Button onClick={() => setCount(count + 1)}>Plus</Button>
    </Box>
  );
};

export const OtherComponent = () => {
  return <DefaultReactComponent title="Test Counter" />;
};
