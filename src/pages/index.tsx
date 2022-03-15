import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Header from "src/components/header";

const Index: NextPage = () => {
  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      <Header title="MeerChat" />
      <Flex w="full" direction="column">
        MeerChat
      </Flex>
    </Flex>
  );
};

export default Index;
