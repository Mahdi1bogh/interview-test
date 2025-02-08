import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post('http://localhost:5005/users/register', req.body,{withCredentials:true});
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to register' });
  }
}