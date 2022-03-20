import { Center, Flex, Input, VStack,Button ,Text,Box} from "@chakra-ui/react";
import { Target } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {useState} from "react"
import {addDoc,collection} from "firebase/firestore"
import {db} from "../firebase/init"

const Index: NextPage = () => {
  const router = useRouter();
  const [publisher,setPublisher] = useState("")
  const [topic,setTopic] = useState("")
  const [datetime,setDatetime] = useState("")
  const [isInput,setIsInput] = useState(false)
  function invitationInput(event: Event) {
    const input: Target = event.target as HTMLInputElement;
    const invitation: String = input.value;
    const nameend: number = invitation.indexOf("さんがあなたを");
    const name: String = invitation.substring(0, nameend);
    const topicstart: number = invitation.indexOf("トピック: ");
    const topicend: number = invitation.indexOf("時間:", topicstart);
    const inputtopic: String = invitation.substring(topicstart + 5, topicend);
    const dtstart:number = invitation.indexOf("時間:",topicend);
    const dtend:number= invitation.indexOf("Zoomミーティングに参加する",dtstart);
    const inputdatetime:String = invitation.substring(dtstart+3,dtend);
    setPublisher(name);
    setTopic(inputtopic);
    setDatetime(inputdatetime);
    setIsInput(true);
  }
  function createNewMeating() {
     addDoc(collection(db,"meeting"), {
       name: "test",
       createdAt: new Date(),
       meetingdate:datetime,
       topic:topic
     }).then((docRef)=>{
        console.log(docRef.id)
router.push("/speaker");
       })}
  return (
    <Flex>
      <Center>
        <VStack>
        {!isInput &&
          <Input
            placeholder="Paset Meeting invitation"
            onChange={invitationInput}
          />}
          {isInput && 
          <>
          <Box borderWidth="1px" borderRadius='lg'>
          <Text>{publisher}</Text>
          <Text>{topic}</Text>
          <Text>{datetime}</Text>
          </Box>
          <Button
            colorScheme="blue"
            width="300px"
            onClick={() => {
              createNewMeating();
            }}
          >
            Create MeerChat
          </Button></> }
      </VStack>
      </Center>
    </Flex>
  );
};

export default Index;
