import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Camera from "src/components/camera";
import Flow from "src/components/flow";
import Header from "src/components/header";
import Register from "src/components/register";

const Index: NextPage = () => {
  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      <Header title="MeerChat" />
      <Flex pos="relative" w="full" direction="column">
        <Box pos="absolute" top="0" left="0">
          <Flow />
        </Box>
        <Camera />
      </Flex>
      <Register />
    </Flex>
  );
};

export default Index;
