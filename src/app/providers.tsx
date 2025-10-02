"use client";

import dynamic from "next/dynamic";
// FIX: Import React to resolve namespace error for React.ReactNode.
import React from "react";

const WagmiProvider = dynamic(
  () => import("~/components/providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider>{children}</WagmiProvider>;
}
