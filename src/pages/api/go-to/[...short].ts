// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { link } from "@prisma/client";
import { prisma } from "../../../db/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<link | null>
) {
  const short = req.url?.split("/").pop();
  const link = await prisma.link.findFirst({ where: { short } });

  return res.status(200).json(link);
}
