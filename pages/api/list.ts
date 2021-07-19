import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../unit/mongodb';

type Data = {
  list: number[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ list: [1,2,3] })
}
