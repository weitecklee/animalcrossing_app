'use server';

import { MongoSetObject, EditOptions } from '@/types';
import connectToMongo from './connectToMongo';

export default async function editMongo(editOptions: EditOptions) {
  const db = await connectToMongo();
  const setObject = {} as MongoSetObject;
  if (editOptions.startDate) {
    setObject.startDate = editOptions.startDate;
  }
  if (editOptions.endDate) {
    setObject.endDate = editOptions.endDate;
  }
  if (editOptions.photoDate) {
    setObject.photoDate = editOptions.photoDate;
  }
  await db
    .collection('history')
    .updateOne({ name: editOptions.name }, { $set: setObject });
}
