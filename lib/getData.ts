import { EventDocument, HistoryDocument } from "@/types";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI,  {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getData(): Promise<{historyData: HistoryDocument[], eventsData: EventDocument[]}> {
  try {
    await client.connect();

    const db = client.db('lasagnark');
    const historyCollection = db.collection<HistoryDocument & {_id: any}>('history');
    const eventsCollection = db.collection<EventDocument & {_id: any}>('events');

    const historyResults = await historyCollection.find().toArray();
    const eventsResults = await eventsCollection.find().toArray();

    const historyData = historyResults.map((doc) => {
      const { _id, ...others } = doc;
      return others;
    });
    const eventsData = eventsResults.map((doc) => {
      const { _id, ...others } = doc;
      return others;
    });

    return {historyData, eventsData};

  } finally {
    await client.close();
  }
}