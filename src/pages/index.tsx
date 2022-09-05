import type { NextPage } from "next";
import { FormEvent, ReactNode, useState } from "react";
import { linkSchema } from "../../zod/schemas";

const Home: NextPage = () => {
  const [origin, setOrigin] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = { origin, short };

    const { success } = linkSchema.safeParse(data);
    if (!success) return;

    setIsLoading(true);
    await (
      await fetch(`${process.env.APP_URL}/api/shortify`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    )
      .json()
      .then(() => {
        navigator.clipboard.writeText(process.env.APP_URL + "/go/" + short);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.container}>
        <h1 className={styles.title}>Shortify</h1>

        <input
          type="text"
          placeholder="https://my-very-very-very-long-long-long-website-url"
          className={styles.input}
          onChange={(e) => {
            setOrigin(e.target.value);
          }}
        />

        <div className="flex flex-row  bg-gray-100 mt-6 rounded-lg overflow-hidden">
          <div
            className={" px-4 py-2  bg-gray-100 text-gray-900 font-semibold"}
          >
            {process.env.APP_URL}
            /go/
          </div>
          <input
            onChange={(e) => {
              setShort(e.target.value);
            }}
            className={styles.output}
            placeholder={"smol"}
          />
        </div>
        <Button isLoading={isLoading}>
          {isLoading ? "Shortifying..." : "Shortify"}
        </Button>
      </form>
    </div>
  );
};

export default Home;

const styles = {
  wrapper: "w-full px-2",
  title: "text-5xl font-bold text-center text-white",
  container:
    "mx-auto  container flex flex-col justify-end  max-w-2xl   p-8 rounded-xl  mt-36  bg-gray-900 bg-opacity-10 backdrop-blur-lg",
  input: "w-full px-4 py-2   outline-none rounded-lg mt-16",
  output: "w-full px-4  py-2 bg-white outline-none font-semibold ",
  copy: "btn-primary  mt-10 py-2 px-6 inline-flex items-center justify-center",
};

function Button({
  isLoading = false,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      className=" mt-8 justify-center inline-flex items-center px-4 py-2  font-bold  text-white transition duration-150 ease-in-out bg-green-500 rounded-md shadow disabled:cursor-not-allowed hover:bg-green-400"
      disabled={isLoading}
    >
      {isLoading && (
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
