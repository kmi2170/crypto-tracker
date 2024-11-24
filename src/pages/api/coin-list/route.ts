"use server";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CoinList } from "../../../config/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currency } = req.query;

    const { data } = await axios.get(CoinList(currency as string));

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
