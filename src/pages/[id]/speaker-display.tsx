import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";

const SpeakerDisplay: NextPage = () => {
  const router = useRouter()
  const [content , setContent] = useState("")
  const [superchat,setSupperchat]= useState(0)
  const [username,setUsername] = useState("")
  useEffect(()=>{
    if(router.isReady){
      console.log(router.query)
      setContent(router.query.content)
      setSupperchat(router.query.superchat)
      setUsername(router.query.username)
    }
  },[router]
  )


  return (
    <Flex
      bg="red.400"
      direction="column"
      w="full"
      h="100vh"
      px={8}
      justifyContent="center"
    >
      <Text fontSize="3xl" color="white" fontWeight="bold">
        {content}
      </Text>
      <Text fontSize="xl" color="white">
        ￥{superchat}
      </Text>
      <Text fontSize="xl" color="white">
        {username}
      </Text>
    </Flex>
  );
};

export default SpeakerDisplay;
