import { Comment, commentFromDoc } from '@/types/comment';
import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { addDoc, collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../firebase/init';

const AudienceDisplay: NextPage = () => {
  const router = useRouter();
  const [windowIsExpanded, setWindowIsExpanded] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [newSuperChat, setNewSuperChat] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const _meetingId: string = router.query.id as string;
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  useEffect(() => {
    document.getElementById('question')?.focus();
  }, []);

  // windowサイズを変更する
  useEffect(() => {
    if (windowIsExpanded) {
      fetchCommentsList();
      window.self.resizeTo(480, 800);
    } else {
      window.self.resizeTo(480, 420);
    }
  }, [windowIsExpanded]);

  const addNewComment = async (): Promise<void> => {
    setLoading(true);
    const commentsCollectionRef = collection(db, 'meetings', _meetingId, 'comments');
    const addComment = await addDoc(commentsCollectionRef, { comments: newComment, superChat: newSuperChat, createdAt: Timestamp.now() });
    setLoading(false);
  };

  const fetchCommentsList = async (): Promise<Comment[]> => {
    let _commentsList: Comment[] = [];
    const _commentsCollectionRef = collection(db, 'meetings', _meetingId, 'comments');
    const _commentsQuery = query(_commentsCollectionRef, orderBy('createdAt', 'desc'));
    const _commentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(_commentsQuery);
    _commentsSnapshot.forEach((doc) => {
      _commentsList.push(commentFromDoc(doc));
    });
    return _commentsList;
  };

  const commentsListBox: JSX.Element[] = commentsList.map((comment: Comment) => {
    return (
      <Box>
        <Text>{comment.comment}</Text>
        <Text>{comment.superChat}</Text>
      </Box>
    );
  });

  return (
    <Flex direction="column" w="full" h="100vh" px={8} py={8}>
      {commentsListBox}
      <Flex mb="2">
        <Text fontSize="16" fontWeight="bold">
          質問フォーム
        </Text>
        <Spacer />
        <Button
          size="sm"
          color={windowIsExpanded ? 'white' : 'gray.500'}
          borderColor="gray.300"
          colorScheme="blackAlpha"
          variant={windowIsExpanded ? 'solid' : 'outline'}
          onClick={() => {
            setWindowIsExpanded(!windowIsExpanded);
          }}
        >
          {windowIsExpanded ? '閉じる' : '全ての質問'}
        </Button>
      </Flex>
      <Textarea
        id="question"
        value={newComment}
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
        focusBorderColor="teal.400"
        placeholder="ここに質問を書いてね"
        borderColor="gray.300"
      />

      <Flex my="8" alignItems="center">
        <Text>金額</Text>
        <Spacer />
        <NumberInput id="super" value={'¥ ' + newSuperChat.toString()} step={100} focusBorderColor="teal.400" borderColor="gray.300">
          <NumberInputField
            onChange={(event) => {
              setNewSuperChat(parseInt(event.target.value));
            }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper color="green.400" />
            <NumberDecrementStepper color="red.400" />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Button mt="2" colorScheme="teal" onClick={addNewComment}>
        送信
      </Button>
    </Flex>
  );
};

export default AudienceDisplay;
