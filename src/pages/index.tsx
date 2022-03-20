import { Center, Flex, Input, VStack } from "@chakra-ui/react";
import { Target } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const router = useRouter();
  function invitationInput(event: Event) {
    const input: Target = event.target as HTMLInputElement;
    const invitation: String = input.value;
    const nameend: number = invitation.indexOf("さんがあなたを");
    const name: String = invitation.substring(0, nameend);
    const topicstart: number = invitation.indexOf("トピック: ");
    const topicend: number = invitation.indexOf("時間:", topicstart);
    const topic: String = invitation.substring(topicstart + 5, topicend);
    console.log(topicstart, topicend);
    console.log(name, topic);
  }
  function createNewMeating() {
    // addDoc(collection(db,"meetings"), {
    //   name: "test",
    //   createdAt: new Date(),
    // });
    router.push("/speaker");
  }
  return (
    <Flex>
      <Center>
        <VStack>
          <Input
            placeholder="Paset Meeting invitation"
            onChange={invitationInput}
          />
          {/* <Button
            colorScheme="blue"
            width="300px"
            onClick={() => {
              createNewMeating();
            }}
          >
            Create MeerChat
          </Button> */}
        </VStack>
      </Center>
    </Flex>
  );
};

export default Index;
