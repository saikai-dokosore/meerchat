import { db } from "@/firebase/init";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { NextPage } from "next";
import router from "next/router";
import { useState } from "react";

const Index: NextPage = () => {
  const [isError, setIsError] = useState(false);
  const [roomId, setRoomId] = useState("");

  // inputに入った文字列から数字を11文字抽出
  const extractRoomId = (str: string) => {
    const _number: string = str.replace(/[^0-9]/g, "");
    const _firstElevenCharacters: string = _number.substring(0, 11);
    return _firstElevenCharacters;
  };

  // 数字が11文字取れているかを判定
  const validateForm = (input: string) => {
    const _firstElevenCharacters = extractRoomId(input);
    setRoomId(_firstElevenCharacters);
    setIsError(_firstElevenCharacters.length != 11);
  };

  // そのIDのmeetingが既に作られているかを判定
  const checkMeetingExists = async (meetingId: string): Promise<boolean> => {
    const meetingDocRef = doc(db, "meetings", meetingId);
    const meetingDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
      meetingDocRef
    );
    return meetingDocSnapshot.exists();
  };

  // まだmeetingが作られていなかった場合、新しくmeetingを作成
  const createNewMeeting = async (meetingId: string): Promise<void> => {
    const meetingExists: boolean = await checkMeetingExists(meetingId);
    if (!meetingExists) {
      const meetingDocRef = doc(db, "meetings", meetingId);
      const setNewMeeting = await setDoc(meetingDocRef, {
        createdAt: Timestamp.now(),
      });
    }
    router.push("/" + meetingId);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      p="20"
      direction="column"
    >
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="email">Zoomリンク</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={(event) => {
            validateForm(event.target.value);
          }}
        />
        {!isError ? (
          <FormHelperText>Zoomリンクを入力</FormHelperText>
        ) : (
          <FormErrorMessage>
            正しいZoomリンクを入力してください
          </FormErrorMessage>
        )}
      </FormControl>

      <Button
        colorScheme="teal"
        mt="16"
        variant={isError ? "outline" : "solid"}
        isDisabled={isError}
        onClick={async () => {
          await createNewMeeting(roomId);
        }}
      >
        {roomId} に入室
      </Button>
    </Flex>
  );
};

export default Index;
