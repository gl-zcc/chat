import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../unit/mongodb';

type Data = {
  msg: string,
  success: boolean,
  data: []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { db } = await connectToDatabase();
  const { receiveId, sendUserId } = req.query;
  const queryResult = await db.collection("message")
    .find({
      $or:[{
        receiveId
      },{
        sendUserId
      }]
    }).toArray();
  res.status(200).json({ success: true, msg: '查询成功', data: queryResult })
}
