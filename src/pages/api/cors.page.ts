import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  try {
    const resProxy = await fetch(url as string);
    res.status(200).send(resProxy.body);
  } catch (error) {
    res.status(400).send(error.toString());
  }
}
