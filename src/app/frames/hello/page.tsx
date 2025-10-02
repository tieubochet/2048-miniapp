import { Metadata } from "next";
import App from "~/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `https://2048-miniapp-v2.vercel.app/background.png`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_miniapp",
      name: "Play 2048 in Farcaster",
      url: `${appUrl}/frames/hello/`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const metadata: Metadata = {
  title: "Play 2048 in Farcaster!",
  description: "Play 2048 in Farcaster",
  openGraph: {
    title: "Play 2048 in Farcaster!",
    description: "Play 2048 in Farcaster",
  },
  other: {
    "fc:miniapp": JSON.stringify(frame),
  },
};

export default function HelloFrame() {
  return <App title={"Hello, world!"} />;
}