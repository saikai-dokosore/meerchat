import { Button, Flex, Spacer, Text, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";

const AudienceDisplay: NextPage = () => {
  useEffect(() => {
    document.getElementById("question")?.focus();
  }, []);

  const resizeWindow = () => {
    window.self.resizeTo(480, 800);
  };

  // TODO: 過去の質問を見るためにタブを大きくしたい

  return (
    <Flex direction="column" w="full" h="100vh" px={8} justifyContent="center">
      <Flex mb="2">
        <Text fontSize="16" fontWeight="bold">
          質問フォーム
        </Text>
        <Spacer />
        <Button
          size="sm"
          color="gray.500"
          borderColor="gray.400"
          variant="outline"
          onClick={() => {
            resizeWindow();
          }}
        >
          全ての質問
        </Button>
      </Flex>
      <Textarea
        id="question"
        focusBorderColor="teal.400"
        placeholder="ここに質問を書いてね"
        borderColor="gray.300"
      />
      <Button mt="2" colorScheme="teal">
        送信
      </Button>
    </Flex>
  );
};

export default AudienceDisplay;
