import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Data {
  dataId: string;
  tagId: string;
  ph: number;
  humidity: number;
  temperature: number;
  ec: number;
  n: number;
  p: number;
  k: number;
  // createdAt: Date;
}

export const dataFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  // const createdAt: Timestamp = doc.data()['createdAt'] as Timestamp;
  const data: Data = {
    dataId: doc.id,
    tagId: doc.data()['tagId'],
    ph: doc.data()['ph'],
    humidity: doc.data()['humidity'],
    temperature: doc.data()['temperature'],
    ec: doc.data()['ec'],
    n: doc.data()['n'],
    p: doc.data()['p'],
    k: doc.data()['k'],
    // createdAt: new Date(createdAt.seconds * 1000),
  };
  return data;
};

export interface DataType {
  id: string;
  text: string;
  unit: string;
}

export const dataTypeList: DataType[] = [
  { id: 'ph', text: 'pH', unit: 'pH' },
  { id: 'humidity', text: '湿度', unit: '%' },
  { id: 'temperature', text: '温度', unit: '℃' },
  { id: 'ec', text: 'EC', unit: 'ms/cm' },
  { id: 'n', text: '窒素', unit: 'mg/kg' },
  { id: 'p', text: 'リン', unit: 'mg/kg' },
  { id: 'k', text: 'カリウム', unit: 'mg/kg' },
];
