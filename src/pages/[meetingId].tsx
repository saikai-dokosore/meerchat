import CommentsTable from '@/components/commentsTable';
import Header from '@/components/header';
import { db } from '@/firebase/init';
import { Meeting, meetingFromDoc } from '@/types/meeting';
import { Flex } from '@chakra-ui/react';
import { collection, doc, DocumentData, getDoc, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { NextPage } from 'next';

export const getStaticPaths = async () => {
  const meetingsList: Meeting[] = [];
  const meetingsCollectionRef = collection(db, 'meetings');
  const meetingsQuery = query(meetingsCollectionRef);
  const meetingsSnapshot: QuerySnapshot<DocumentData> = await getDocs(meetingsQuery);
  meetingsSnapshot.forEach((doc) => {
    meetingsList.push(meetingFromDoc(doc));
  });

  const paths = meetingsList.map((meeting: Meeting) => ({
    params: {
      meetingId: meeting.meetingId,
    },
  }));
  return { paths, fallback: 'blocking' };
};

interface Params {
  params: {
    meetingId: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const meetingDocRef = doc(db, 'meetings', params.meetingId);
  const meetingDocData = await getDoc(meetingDocRef);
  // 作成されていないPathなら404へリダイレクト
  if (!meetingDocData.exists()) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const meeting: Meeting = meetingFromDoc(meetingDocData);
  return {
    props: {
      meetingId: meeting.meetingId,
    },
  };
};

interface Props {
  meetingId: string;
}

const Index: NextPage<Props> = ({ ...props }: Props) => {
  return (
    <Flex direction="column" w="full" h="full">
      <Header meetingId={props.meetingId} />
      <Flex direction="column" w="full" px={32} py={24}>
        <CommentsTable meetingId={props.meetingId} />
      </Flex>
    </Flex>
  );
};

export default Index;
