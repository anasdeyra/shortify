import { link } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

export default function Short({ origin }: Props) {
  useEffect(() => {
    origin && window.location.assign(origin);
  });
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const short = ctx.query.short;
  const link: link | null = await (
    await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3000"}/api/go-to/${short}`
    )
  ).json();

  return {
    props: { origin: link?.origin || null },
  };
};

type Props = {
  origin: string;
};
