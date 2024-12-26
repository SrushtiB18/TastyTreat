// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: "#F4D9D0",
        _hover: {
          color: "#D9ABAB",
          textDecoration: "none"
        },
      },
    },
  },
});

export default theme;
