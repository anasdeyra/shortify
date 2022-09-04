import { link } from "@prisma/client";
import { prisma } from "../../db/prismaClient";

import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

export default function Short({ origin }: Props) {
  useEffect(() => {
    origin && window.location.assign(origin);
  });
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const short = String(ctx.query.short);

  const link = await prisma.link.findFirst({ where: { short } });

  return {
    props: { origin: link?.origin || null },
  };
};

type Props = {
  origin: string | null;
};
