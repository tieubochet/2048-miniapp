"use client";

import { useEffect, useCallback, useState } from "react";
// Fix: Import types from schema subpath. Changed MiniAppContext to FrameContext.
import { sdk, type FrameContext } from "@farcaster/miniapp-sdk";
import type { MiniAppNotificationDetails as FrameNotificationDetails } from "@farcaster/miniapp-sdk/schema";
import {
  useAccount,
  useDisconnect,
  useConnect,
  useSwitchChain,
  useChainId,
} from "wagmi";

import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";
// Fix: Import chains from viem/chains
import { base, optimism } from "viem/chains";
// Fix: Import BaseError to properly type-check errors.
import { BaseError, UserRejectedRequestError } from "viem";
import Head from "next/head";
import styles from "~/app/index.module.css";
import Board from "~/components/2048/board";
import Score from "~/components/2048/score";

export default function Demo(
  { title }: { title?: string } = { title: "Play 2048 in Farcaster" }
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext | undefined>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [addMiniAppResult, setAddMiniAppResult] = useState("");
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);

  useEffect(() => {
    setNotificationDetails(context?.client.notificationDetails ?? null);
  }, [context]);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const load = () => {
      setContext(sdk.context);
      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  }, [isConnected, connectors, connect]);


  const openProfileAuth = useCallback(() => {
    sdk.actions.openUrl("https://warpcast.com/tieubochet.eth");
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const addMiniApp = useCallback(async () => {
    try {
      setNotificationDetails(null);
      await sdk.actions.addMiniApp();
      setAddMiniAppResult("App added successfully!");
      setContext(currentContext => {
        if (!currentContext) return currentContext;
        return {
          ...currentContext,
          client: {
            ...currentContext.client,
            added: true,
          }
        };
      });
    } catch (error: any) {
      if (error.name === 'RejectedByUser') {
        setAddMiniAppResult('Not added: User rejected the request.');
      } else {
        setAddMiniAppResult(`Error: ${error.message}`);
      }
    }
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

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
          <img src={context?.user.pfpUrl ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt={context?.user.username ?? ''} />
        </div>
        <Score name={context?.user.username ?? 'player'} />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <p>Game 2048 in Farcaster Frame V2.</p>
      </div>
      <div className={styles.groupbtn}>
        <Button onClick={addMiniApp} disabled={context?.client.added}>
          Add Client
        </Button>
        <Button onClick={close}>Close</Button>
      </div>
    </div>
  );
}
const renderError = (error: Error | null) => {
  if (!error) return null;
  if (error instanceof BaseError) {
    // FIX: Cast error to BaseError to allow access to the .walk() method.
    const isUserRejection = (error as BaseError).walk(
      (e) => e instanceof UserRejectedRequestError
    );

    if (isUserRejection) {
      return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>;
    }
  }

  return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
};
