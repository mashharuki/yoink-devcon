import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import { createExampleURL } from "./utils";
import { Frame } from "./components/Frame";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yoink",
    description: "Click to yoink the flag.",
    other: {
      ...(await fetchMetadata(createExampleURL("/frames"))),
    },
  };
}

export default async function Home() {
  const metadata = await generateMetadata();

  return (
    <div className="flex flex-col max-w-[600px] w-full gap-2 mx-auto p-2">
      <Frame metadata={metadata} url={createExampleURL("/frames")} />
    </div>
  );
}
