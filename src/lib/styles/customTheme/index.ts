import type { ColorMode } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const customTheme = extendTheme({
  fonts,
  colors,
  components: {
    Button,
    Text: {
      variants: {
        secondary: ({ colorMode }: { colorMode: ColorMode }) => ({
          color: colorMode === "dark" ? "lightgrey" : "grey",
        }),
      },
    },
    Input: { defaultProps: { variant: "filled" } },
    Skeleton: { defaultProps: { borderRadius: "md" } },
  },
});

export default customTheme;
