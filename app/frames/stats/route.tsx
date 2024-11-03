/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getScoreByAddress } from "../../../lib/contract";
import { getUserByAddress } from "../../../lib/neynar";
import { formatDuration, formatTimestamp } from "../../../lib/time";

const frameHandler = frames(async (ctx) => {
  if (!ctx.searchParams.address) {
    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex">No address provided.</div>
        </div>
      ),
      buttons: [
        <Button action="post" target={{ pathname: "/" }}>
          Back
        </Button>,
      ],
    };
  }

  const address = ctx.searchParams.address as `0x${string}`;
  const [score, user] = await Promise.all([
    getScoreByAddress(address),
    getUserByAddress(address),
  ]);

  const username = user ? user.username : address;
  const timeHeld = formatDuration(Number(score.time));

  return {
    title: "Your Stats",
    image: (
      <div tw="flex flex-col w-full h-full p-16 gap-4">
        <div tw="flex text-6xl font-bold mb-8">📊 Stats for {username}</div>
        <div tw="flex text-4xl justify-between">
          <span>Total yoinks</span>
          <span tw="text-gray-500">{score.yoinks.toString()}</span>
        </div>
        <div tw="flex text-4xl justify-between">
          <span>Total time held</span>
          <span tw="text-gray-500">{timeHeld}</span>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="post" target={{ pathname: "/" }}>
        Back
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
