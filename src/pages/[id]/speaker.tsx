import { Flex ,Text} from "@chakra-ui/react";
import { NextPage } from "next";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import CommentCard from "./comment-card"
import {db} from "../../firebase/init"
import {getDocs} from "firebase/firestore"

const Speaker: NextPage = () => {
  const router =useRouter();
  const Id:String = router.asPath.split("/")[1]
  const [smallWindow, setSmallWindow] = useState<Window>();
  const [smallWindowOpened, setSmallWindowOpened] = useState<boolean>(false);
  const openWindow = () => {
    if (screen !== undefined) {
      const width = 360;
      const height = 160;
      const screenX = 0;
      const screenY = 0;
      const _smallWindow = window.open(
        "http://localhost:3000/${Id}/speaker-display/",
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
    <Text>SpeakerDeck</Text>  
      <CommentCard/>
    </Flex>
  );
};

export default Speaker;
