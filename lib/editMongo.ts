'use server';

import { MongoSetObject, EditOptions, MongoInsertOperation } from '@/types';
import connectToMongo from './connectToMongo';

const timezoneOffset = 'T04:00:00.000Z';

export default async function editMongo(editOptions: EditOptions) {
  const db = await connectToMongo();
  const setObject = {} as MongoSetObject;
  const unsetObject = {} as MongoSetObject;
  const updateObject = {} as { $set?: MongoSetObject; $unset?: MongoSetObject };
  const eventsOperations: MongoInsertOperation[] = [];

  setObject.islandmates = editOptions.islandmates;
  updateObject.$set = setObject;
  if (editOptions.startDate) {
    const startDate = editOptions.startDate + timezoneOffset;
    setObject.startDate = new Date(startDate);
    updateObject.$set = setObject;
    eventsOperations.push({
      insertOne: {
        document: {
          villager: editOptions.name,
          date: startDate,
          event: 0, // 'moved in',
        },
      },
    });
  } else {
    unsetObject.startDate = null;
    updateObject.$unset = unsetObject;
  }
  if (editOptions.endDate) {
    const endDate = editOptions.endDate + timezoneOffset;
    setObject.endDate = new Date(endDate);
    updateObject.$set = setObject;
    eventsOperations.push({
      insertOne: {
        document: {
          villager: editOptions.name,
          date: endDate,
          event: 3, // 'moved out',
        },
      },
    });
  } else {
    unsetObject.endDate = null;
    updateObject.$unset = unsetObject;
  }
  if (editOptions.photoDate) {
    const photoDate = editOptions.photoDate + timezoneOffset;
    setObject.photoDate = new Date(photoDate);
    updateObject.$set = setObject;
    eventsOperations.push({
      insertOne: {
        document: {
          villager: editOptions.name,
          date: photoDate,
          event: 2, // 'gave photo',
        },
      },
    });
  } else {
    unsetObject.photoDate = null;
    updateObject.$unset = unsetObject;
  }
  if (editOptions.celebrated) {
    const celebrated = editOptions.celebrated + timezoneOffset;
    eventsOperations.push({
      insertOne: {
        document: {
          villager: editOptions.name,
          date: celebrated,
          event: 1, // 'birthday',
        },
      },
    });
  }

  if (!updateObject.$set) {
    await db.collection('history').bulkWrite([
      {
        updateMany: {
          filter: {},
          update: { $pull: { islandmates: editOptions.name } } as any, // bypass Typescript check
        },
      },
      { deleteOne: { filter: { name: editOptions.name } } },
    ]);
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
      const islandmates = res.map((doc) => doc.name);
      updateObject['$set'].islandmates = islandmates;
      await db.collection('history').bulkWrite([
        {
          updateMany: {
            filter: { _id: { $in: idsToUpdate } },
            update: { $addToSet: { islandmates: editOptions.name } },
          },
        },
        {
          insertOne: {
            document: { name: editOptions.name, ...updateObject.$set },
          },
        },
      ]);
    }
    await db
      .collection('events')
      .bulkWrite([
        { deleteMany: { filter: { villager: editOptions.name } } },
        ...eventsOperations,
      ]);
  }
}
