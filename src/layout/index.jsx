import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
