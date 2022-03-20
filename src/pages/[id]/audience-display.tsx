import {
  Input,
  Button,
  Box,
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

  const randomname = Math.random().toString();

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

  const [username, setUsername] = useState(randomname);

  const inputusername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const [superchat, setSuperchat] = useState(0);

  const inputsuperchat = (e) => {

    console.log(e.targe
    )
    if (e.target) {
      const value = e.target.value;
      setSuperchat(value);
    }
  };

  const [transferred, setTranseferred] = useState(false);

  const sendComment = () => {
    console.log(comment, superchat);
    if (comment != "" || superchat != 0) {
      console.log(comment, superchat);
      addDoc(collection(db, "meeting", Id, "comment"), {
        content: comment,
        superchat: superchat,
        username: username,
      }).then(() => {
        console.log(222);
        setComment("");
        setSuperchat(0);
        setTranseferred(true);
        setTimeout(setTranseferred(false), 5000);
        document.getElementById("super").value = 0;
      });
    }
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
      <Input placeholder="UserName" onChange={inputusername} />
      <Textarea
        id="question"
        value={comment}
        onChange={inputcomment}
        focusBorderColor="teal.400"
        placeholder="ここに質問を書いてね"
        borderColor="gray.300"
      />
      <Flex>
        <Text>SupperChat!!</Text>
        <Spacer />
        <Text color="red" fontSize="xl">
          ¥
        </Text>
        <NumberInput
          id="super"
          step={100}
          placeholder="Supper Chat!!!"
        >
          <NumberInputField

          onChange={inputsuperchat}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      {transferred ? (
        <Box color="red">Success!!</Box>
      ) : (
        <Button mt="2" colorScheme="teal" onClick={sendComment}>
          送信
        </Button>
      )}
    </Flex>
  );
};

export default AudienceDisplay;
