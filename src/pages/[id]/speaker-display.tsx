import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const SpeakerDisplay: NextPage = () => {
  return (
    <Flex
      bg="red.400"
      direction="column"
      w="full"
      h="100vh"
      px={8}
      justifyContent="center"
    >
      <Text fontSize="3xl" color="white" fontWeight="bold">
        こんにちは
      </Text>
      <Text fontSize="xl" color="white">
        ￥10,000
      </Text>
    </Flex>
  );
};

export default SpeakerDisplay;
