import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prismaClient";
import { linkSchema } from "../../../zod/schemas";

interface Data {}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body;
  const validation = linkSchema.safeParse({
    origin: body.origin,
    short: body.short,
  });

  if (!validation.success) return res.status(400).json(validation.error);

  prisma.link
    .create({ data: validation.data })
    .then((createdLink) => {
      return res.json(createdLink);
    })
    .catch((e) => {
      if (e?.code === "P2002")
        return res
          .status(400)
          .json({ message: "the short link is already being used" });
      return res.status(500).json({ message: "something went wrong" });
    });
};
