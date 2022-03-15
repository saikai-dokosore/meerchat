import { Flex } from "@chakra-ui/react";
import Sidebar from "src/components/sidebar";

const Layout = ({ children }: { children: any }) => {
  return (
    <Flex bg="gray.100" w="100vw" h="100vh">
      <Sidebar />
      {children}
    </Flex>
  );
};

export default Layout;
