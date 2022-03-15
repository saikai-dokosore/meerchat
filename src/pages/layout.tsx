import { Flex } from "@chakra-ui/react";

const Layout = ({ children }: { children: any }) => {
  return (
    <Flex bg="gray.100" w="100vw" h="100vh">
      {children}
    </Flex>
  );
};

export default Layout;
