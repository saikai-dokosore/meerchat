import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";

const AudienceDisplay: NextPage = () => {
  return (
    <Flex direction="column" w="full" h="100vh" px={8} justifyContent="center">
      <Box mb="2" fontSize="16" fontWeight="bold">
        質問フォーム
      </Box>
      <Textarea placeholder="ここに質問を書いてね" borderColor="gray.300" />
      <Button mt="2" colorScheme="teal">
        送信
      </Button>
    </Flex>
  );
};

export default AudienceDisplay;
