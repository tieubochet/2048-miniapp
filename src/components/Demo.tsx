"use client";

import { useEffect, useCallback, useState } from "react";
import { sdk, type MiniAppContext } from "@farcaster/miniapp-sdk";
import Head from "next/head";
import styles from "~/app/index.module.css";
import Board from "~/components/2048/board";
import Score from "~/components/2048/score";
import { Button } from "./ui/Button";

export default function Demo(
  { title }: { title?: string } = { title: "Play 2048 in Farcaster" }
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<MiniAppContext>();

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const addMiniApp = useCallback(async () => {
    try {
      await sdk.actions.addMiniApp();
      alert("Mini App added successfully!");
    } catch (error) {
      console.error("Failed to add Mini App", error);
      alert(`Failed to add Mini App: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const userName = context?.user.displayName ?? context?.user.username;

  return (
    <div className={styles.twenty48}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Play 2048 in Farcaster"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <div className={styles.player}>
          <img src={context?.user.pfpUrl ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt={userName ?? ''} />
        </div>
        <Score name={userName ?? 'player'} />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <p>Game 2048 in Farcaster Frame V2.</p>
      </div>
      <div className={styles.groupbtn}>
        <Button onClick={addMiniApp} disabled={context?.client.added}>
          Add Mini App
        </Button>
        <Button onClick={close}>Close</Button>
      </div>
    </div>
  );
}