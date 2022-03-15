import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";

const Audience: NextPage = () => {
  const openWindow = () => {
    if (screen !== undefined) {
      const width = 480;
      const height = 240;
      const screenX = screen.width - width - 16;
      const screenY = screen.height - height - 64;
      window.open(
        "http://localhost:3000/audience-display/",
        "audience",
        `width=${width},height=${height},screenY=${screenY},screenX=${screenX},toolbar=no,menubar=no,scrollbars=no`
      );
    }
  };
  openWindow();

  useEffect(() => {
    openWindow();
    // TODO: なんとかしてタブを閉じたい
    // window.open("about:blank", "_self", "")?.close();
  }, []);

  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      audience
    </Flex>
  );
};

export default Audience;
