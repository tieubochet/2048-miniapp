// Fix: Added React import to resolve JSX issues.
import * as React from "react";
// Fix: ImageResponse is exported from 'next/server', not 'next/og'.
import { ImageResponse } from "next/server";

export const alt = "Play 2048 in Farcaster";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <img src="https://2048-miniapp-v2.vercel.app/background.png" alt="bg" />
    ),
    {
      ...size,
    }
  );
}
