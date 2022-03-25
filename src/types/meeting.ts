import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export interface Meeting {
  meetingId: string;
  createdAt: Date;
}

export const meetingFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const meeting: Meeting = {
    meetingId: doc.id,
    createdAt: doc.data()["createdAt"].toDate(),
  };
  return meeting;
};
