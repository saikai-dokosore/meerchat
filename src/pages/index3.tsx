import { Button, Flex, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Header from "src/components/header";

const Index: NextPage = () => {
  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      <Header title="MeerChat" />
      <VStack spacing={4} alignItems="left">
        <Link href="/speaker">
          <Button
            w="36"
            as="a"
            colorScheme="teal"
            variant="solid"
            cursor="pointer"
          >
            スピーカー
          </Button>
        </Link>
        <Link href="/audience">
          <Button
            w="36"
            as="a"
            colorScheme="teal"
            variant="solid"
            cursor="pointer"
          >
            オーディエンス
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Index;
