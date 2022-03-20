import {
  Button,
  Flex,
  Spacer,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/init";

const AudienceDisplay: NextPage = () => {
  const router = useRouter();
  const Id: String = router.asPath.split("/")[1];

  useEffect(() => {
    document.getElementById("question")?.focus();
  }, []);

  const resizeWindow = () => {
    window.self.resizeTo(480, 800);
  };

  // TODO: 過去の質問を見るためにタブを大きくしたい

  const [comment, setComment] = useState("");

  const inputcomment = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const [superchat, setSuperchat] = useState(0);

  const inputsuperchat = (e) => {
    const value = e.target.value;
    setSuperchat(value);
    console.log(value);
  };

  const sendComment = () => {
    addDoc(collection(db, "meeting", Id, "comment"), {
      content: comment,
      superchat: superchat,
    }).then(() => {
      setComment("");
      setSuperchat(0);
    });
  };

  return (
    <Flex direction="column" w="full" h="100vh" px={8} justifyContent="center">
      <Flex mb="2">
        <Text fontSize="16" fontWeight="bold">
          質問フォーム
        </Text>
        <Spacer />
        <Button
          size="sm"
          color="gray.500"
          borderColor="gray.400"
          variant="outline"
          onClick={() => {
            resizeWindow();
          }}
        >
          全ての質問
        </Button>
      </Flex>
      <Textarea
        id="question"
        onChange={inputcomment}
        focusBorderColor="teal.400"
        placeholder="ここに質問を書いてね"
        borderColor="gray.300"
      />
      <Text color="red">¥</Text>
      <NumberInput step={100}>
        <NumberInputField
          placeholder="Supper Chat!!!"
          onChange={inputsuperchat}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button mt="2" colorScheme="teal">
        送信
      </Button>
    </Flex>
  );
};

export default AudienceDisplay;
