import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Audience: NextPage = () => {
  const [smallWindow, setSmallWindow] = useState<Window>();
  const [smallWindowOpened, setSmallWindowOpened] = useState<boolean>(false);
  const openWindow = () => {
    if (screen !== undefined) {
      const width = 480;
      const height = 240;
      const screenX = screen.width - width - 16;
      const screenY = screen.height - height - 64;
      const _smallWindow = window.open(
        "http://localhost:3000/audience-display/",
        "audience",
        `width=${width},height=${height},screenY=${screenY},screenX=${screenX},toolbar=no,menubar=no,scrollbars=no`
      );
      _smallWindow!.blur();
      _smallWindow!.focus();
      setSmallWindow(_smallWindow as Window);
    }
  };

  useEffect(() => {
    // TODO: リスタート時にタブが復活する設定を回避できたら嬉しい
    if (!smallWindowOpened) {
      openWindow();
      setSmallWindowOpened(true);
    }
    window.close();
    // window.open("", "_self", "")?.close();
  }, []);

  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      audience
    </Flex>
  );
};

export default Audience;
