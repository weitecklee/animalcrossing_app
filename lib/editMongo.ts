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
    const res = await db
      .collection('history')
      .updateOne({ name: editOptions.name }, updateObject);
    if (res.matchedCount === 0) {
      // new villager, find islandmates
      const givenDate = new Date(editOptions.startDate!);
      const res = await db
        .collection('history')
        .find({
          startDate: { $lte: givenDate },
          $or: [
            { endDate: { $gte: givenDate } },
            { endDate: { $exists: false } },
          ],
        })
        .toArray();
      const idsToUpdate = res.map((doc) => doc._id);
      await db
        .collection('history')
        .updateMany(
          { _id: { $in: idsToUpdate } },
          { $addToSet: { islandmates: editOptions.name } },
        );
      const islandmates = res.map((doc) => doc.name);
      updateObject['$set'].islandmates = islandmates;
      await db.collection('history').insertOne({
        name: editOptions.name,
        ...updateObject.$set,
      });
    }
  }
}
