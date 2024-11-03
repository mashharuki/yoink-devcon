/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getTotalYoinks } from "../../../lib/contract";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  if (!ctx.message?.transactionId) {
    throw new Error("No transaction ID");
  }
  if (!ctx.message?.address) {
    throw new Error("No address");
  }

  const totalYoinks = await getTotalYoinks();

  return {
    title: "Yoink!",
    image: (
      <div tw="flex flex-col p-16 items-center">
        <div tw="flex flex-col items-center mb-8">
          <div tw="flex relative w-64 h-64 overflow-hidden rounded-full">
            <img
              src={`${process.env.APP_URL}/flag.png`}
              tw="absolute w-full h-full object-cover"
              alt="flag"
            />
          </div>
          <div tw="flex text-8xl font-bold text-red-500">Yoink!</div>
          <div tw="flex">You have the flag. 🚩</div>
        </div>
        <div tw="flex text-4xl">
          The flag has been yoinked {totalYoinks.toString()} times.
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/leaderboard" }}>
        🏆 Leaderboard
      </Button>,
      <Button
        action="link"
        target={`https://basescan.org/tx/${ctx.message.transactionId}`}
      >
        🔍 View Tx
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
