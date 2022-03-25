import { db } from '@/firebase/init';
import { Comment, commentFromDoc } from '@/types/comment';
import { Box, Flex, Text } from '@chakra-ui/react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SpeakerDisplay: NextPage = () => {
  const [latestComment, setLatestComment] = useState<Comment>();
  const router = useRouter();

  // リアルタイムで常にデータベースを監視
  if (router.isReady) {
    const _meetingId: string = router.query.id as string;
    const commentsCollectionRef = collection(db, 'meetings', _meetingId, 'comments');
    const commentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), limit(1));
    const fetchLatestComment = onSnapshot(commentsQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setLatestComment(commentFromDoc(doc));
      });
    });
  }

  const commentBox = (): JSX.Element => {
    if (latestComment) {
      return (
        <Box>
          <Text fontSize="3xl" color="white" fontWeight="bold">
            {latestComment.comment}
          </Text>
          <Text fontSize="xl" color="white">
            ¥ {latestComment.superChat}
          </Text>
        </Box>
      );
    } else {
      return <Box></Box>;
    }
  };

  return (
    <Flex bg="red.400" direction="column" w="full" h="100vh" px={8} justifyContent="center">
      {commentBox()}
    </Flex>
  );
};

export default SpeakerDisplay;
