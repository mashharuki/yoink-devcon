/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  return {
    title: "Yoink!",
    image: (
      <div tw="flex flex-col">
        <div tw="font-bold text-8xl text-red-500">Yoink!</div>
        <div tw="text-6xl">Click to yoink the flag. 🚩</div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/start" }}>
        🚩 Start
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
