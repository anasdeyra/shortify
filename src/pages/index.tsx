import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { linkSchema } from "../../zod/schemas";

const Home: NextPage = () => {
  const [origin, setOrigin] = useState("");
  const [short, setShort] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = { origin, short };
    console.log(data);
    const { success } = linkSchema.safeParse(data);
    if (!success) return;
    const response = await (
      await fetch(
        `${
          process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
        }/api/shortify`,
        { body: JSON.stringify(data), method: "POST" }
      )
    ).json();
    console.log(response);
  }

  return (
    <>
      <form onSubmit={onSubmit} className={styles.container}>
        <h1 className={styles.title}>Shortify</h1>
        <div className="flex flex-row gap-4 mt-16">
          <input
            type="text"
            placeholder="https://my-very-very-very-long-long-long-website-url"
            className={styles.input}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
          <button type="submit" className={"btn-secondary"}>
            Shortify
          </button>
        </div>
        <div className="flex flex-row border-2 bg-gray-100 mt-4 rounded-lg overflow-hidden">
          <div
            className={" px-4 py-2   bg-gray-100 text-gray-900 font-semibold"}
          >
            {process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}
          </div>
          <input
            onChange={(e) => {
              setShort(e.target.value);
            }}
            className={styles.output}
          />
        </div>
        <button type="button" className={styles.copy}>
          Copy link
        </button>
      </form>
    </>
  );
};

export default Home;

const styles = {
  title: "text-5xl font-bold text-center text-white",
  container:
    "container flex flex-col max-w-2xl p-8 rounded-xl  mx-auto mt-36  bg-gray-900 bg-opacity-10 backdrop-blur-lg",
  input: "w-full px-4 py-2 border-2  outline-none rounded-lg ",
  output: "w-full px-4  py-2 bg-white outline-none font-semibold ",
  copy: "btn-primary mx-auto mt-4",
};
