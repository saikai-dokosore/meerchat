import { db } from "@/firebase/init";
import { Comment, commentFromDoc } from "@/types/comment";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const CommentsTable = ({ meetingId }: { meetingId: string }) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const fetchCommentsList = async (): Promise<Comment[]> => {
    let _commentsList: Comment[] = [];
    const _commentsCollectionRef = collection(
      db,
      "meetings",
      meetingId,
      "comments"
    );
    const _commentsQuery = query(
      _commentsCollectionRef,
      orderBy("createdAt", "desc")
    );
    const _commentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      _commentsQuery
    );
    _commentsSnapshot.forEach((doc) => {
      _commentsList.push(commentFromDoc(doc));
    });
    return _commentsList;
  };

  useEffect(() => {
    (async () => {
      const _commentsList: Comment[] = await fetchCommentsList();
      setCommentsList(_commentsList);
    })();
  }, []);

  const _commentsListTd: JSX.Element[] = commentsList.map(
    (comment: Comment) => {
      return (
        <Tr>
          <Td>{comment.comment}</Td>
          <Td>¥ {comment.superChat.toString()}</Td>
        </Tr>
      );
    }
  );

  return (
    <Flex direction="column" w="full">
      <Table w="full" variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>コメント</Th>
            <Th>スーパチャット</Th>
          </Tr>
        </Thead>
        <Tbody>{_commentsListTd}</Tbody>
      </Table>
    </Flex>
  );
};

export default CommentsTable;
