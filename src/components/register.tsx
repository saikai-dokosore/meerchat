import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { textListState } from "src/atom/test";

const Register = () => {
  const [textList, setTextList] = useRecoilState(textListState);
  const [newText, setNewText] = useState<string>("");

  const registerText = () => {
    setTextList(textList.concat([newText]));
    setNewText("");
  };

  useEffect(() => {}, [newText]);

  return (
    <HStack m="16" spacing="8">
      <Input
        colorScheme="teal"
        variant="outline"
        borderColor="gray.300"
        onChange={(event) => {
          setNewText(event.target.value);
        }}
      />
      <Button
        value={newText}
        colorScheme="teal"
        variant="solid"
        onClick={() => {
          registerText();
        }}
      >
        送信
      </Button>
    </HStack>
  );
};

export default Register;
