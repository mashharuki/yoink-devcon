/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getLastYoinkedBy, getTotalYoinks } from "../../../lib/contract";
import { getUserByAddress, truncateAddress } from "../../../lib/neynar";

const frameHandler = frames(async (ctx) => {
  const [lastYoinkedBy, totalYoinks] = await Promise.all([
    getLastYoinkedBy(),
    getTotalYoinks(),
  ]);

  const user = await getUserByAddress(lastYoinkedBy);
  const username = user ? user.username : truncateAddress(lastYoinkedBy);
  const pfp = user?.pfp_url;

  return {
    title: "Yoink!",
    image: (
      <div tw="flex flex-col p-16 items-center">
        <div tw="flex flex-col items-center mb-8">
          {pfp && (
            <div tw="flex relative w-64 h-64 overflow-hidden rounded-full">
              <img
                src={pfp}
                tw="absolute w-full h-full object-cover"
                alt={username}
              />
            </div>
          )}
          <div tw="flex text-6xl font-bold">{username}</div>
          <div tw="flex">has the flag.</div>
        </div>
        <div tw="flex text-4xl">
          The flag has been yoinked {totalYoinks.toString()} times.
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/" }}>
        Back
      </Button>,
      <Button
        action="tx"
        target={{ pathname: "/tx-data" }}
        post_url={{ pathname: "/tx-receipt" }}
      >
        Yoink
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
