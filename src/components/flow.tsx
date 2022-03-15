import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { textListState } from "src/atom/test";

const Flow = () => {
  const textList = useRecoilValue(textListState);

  const _textList = textList.map((text) => {
    return <p>{text}</p>;
  });
  return (
    <Flex
      w="full"
      h="full"
      direction="column"
      color="white"
      fontWeight="700"
      fontSize="36"
    >
      {_textList}
    </Flex>
  );
};

export default Flow;
