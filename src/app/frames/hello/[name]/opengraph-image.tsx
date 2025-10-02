// Fix: Added React import to resolve JSX issues.
import * as React from "react";
// Fix: ImageResponse is exported from 'next/server', not 'next/og'.
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "Hello Frame";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { name } = await params;

  return new ImageResponse(
    (
      // Fix: Replaced 'tw' prop with 'style' to resolve TypeScript error.
      <div style={{display: 'flex', height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundColor: 'white'}}>
        {/* Fix: Replaced 'tw' prop with 'style' to resolve TypeScript error. */}
        <h1 style={{fontSize: '3.75rem'}}>Hello, {name}</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
