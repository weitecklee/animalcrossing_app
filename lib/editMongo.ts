'use server';

import { MongoSetObject, EditOptions } from '@/types';
import connectToMongo from './connectToMongo';

export default async function editMongo(editOptions: EditOptions) {
  const db = await connectToMongo();
  const setObject = {} as MongoSetObject;
  const unsetObject = {} as MongoSetObject;
  const updateObject = {} as { $set?: MongoSetObject; $unset?: MongoSetObject };

  if (editOptions.startDate) {
    setObject.startDate = editOptions.startDate;
    updateObject.$set = setObject;
  } else {
    unsetObject.startDate = '';
    updateObject.$unset = unsetObject;
  }
  if (editOptions.endDate) {
    setObject.endDate = editOptions.endDate;
    updateObject.$set = setObject;
  } else {
    unsetObject.endDate = '';
    updateObject.$unset = unsetObject;
  }
  if (editOptions.photoDate) {
    setObject.photoDate = editOptions.photoDate;
    updateObject.$set = setObject;
  } else {
    unsetObject.photoDate = '';
    updateObject.$unset = unsetObject;
  }

  if (!updateObject.$set) {
    await db.collection('history').deleteOne({ name: editOptions.name });
  } else {
    await db
      .collection('history')
      .updateOne({ name: editOptions.name }, updateObject, { upsert: true });
  }
}
