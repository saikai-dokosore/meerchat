import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export interface Comment {
  commentId: string;
  comment: string;
  superChat: number;
  createdAt: Date;
}

export const commentFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const comment: Comment = {
    commentId: doc.id,
    comment: doc.data()["comment"],
    superChat: doc.data()["superChat"],
    createdAt: doc.data()["createdAt"].toDate(),
  };
  return comment;
};
