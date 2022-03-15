import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Speaker: NextPage = () => {
  const [smallWindow, setSmallWindow] = useState<Window>();
  const [smallWindowOpened, setSmallWindowOpened] = useState<boolean>(false);
  const openWindow = () => {
    if (screen !== undefined) {
      const width = 360;
      const height = 160;
      const screenX = 0;
      const screenY = 0;
      const _smallWindow = window.open(
        "http://localhost:3000/speaker-display/",
        "speaker",
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
  }, []);

  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      speaker
    </Flex>
  );
};

export default Speaker;
