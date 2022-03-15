import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";

const Speaker: NextPage = () => {
  const openWindow = () => {
    if (screen !== undefined) {
      const width = 360;
      const height = 160;
      const screenX = 0;
      const screenY = 0;
      window.open(
        "http://localhost:3000/speaker-display/",
        "speaker",
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
      speaker
    </Flex>
  );
};

export default Speaker;
