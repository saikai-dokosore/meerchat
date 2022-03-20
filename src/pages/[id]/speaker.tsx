import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommentCard from "./comment-card";
import { db } from "../../firebase/init";
import { getDocs, onSnapshot, query, collection } from "firebase/firestore";

const Speaker: NextPage = () => {
  const router = useRouter();
  const Id: String = router.asPath.split("/")[1];
  const [smallWindow, setSmallWindow] = useState<Window>();
  const [smallWindowOpened, setSmallWindowOpened] = useState<boolean>(false);
  const openWindow = (Id, data) => {
    if (screen !== undefined) {
      const width = 360;
      const height = 160;
      const screenX = 0;
      const screenY = 0;
      const _smallWindow = window.open(
        "http://localhost:3000/" +
          Id +
          "/speaker-display/?content=" +
          data.content +
          "&username=" +
          data.username +
          "&superchat=" +
          data.superchat,
        "speaker",
        `width=${width},height=${height},screenY=${screenY},screenX=${screenX},toolbar=no,menubar=no,scrollbars=no`
      );
      _smallWindow!.blur();
      _smallWindow!.focus();
      setSmallWindow(_smallWindow as Window);
    }
  };

  const [comment, setComment] = useState({});
  const [commentlsit, setCommentlist] = useState([]);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "meeting", Id, "comment"),
      (snapshot) => {
        console.log(9);
        let new_comment = {};
        let new_commentlist = [];
        snapshot.forEach((doc) => {
          console.log(doc.data().content);
          new_commentlist.push(<p>{doc.data().content}</p>);
          if (comment[doc.id]) {
            new_comment[doc.id] = {
              content: doc.data().content,
              superchat: doc.data().superchat,
              username: doc.data().username,
              isNew: false,
            };
          } else {
            new_comment[doc.id] = {
              content: doc.data().content,
              superchat: doc.data().superchat,
              username: doc.data().username,
              isNew: true,
            };
            if (router.isReady) {
              openWindow(Id, doc.data());
            }
          }
        });
        setComment(new_comment);
        setCommentlist(new_commentlist);
      }
    );

    setUrl("http://localhost:3000/" + Id + "/audience");
  }, [router]);

  return (
    <Flex direction="column" w="full" h="100vh" px={8}>
      <Text>SpeakerDeck</Text>
      <Text>link for audience</Text>
      <Text>{url}</Text>
      {commentlsit}
      <CommentCard />
    </Flex>
  );
};

export default Speaker;
