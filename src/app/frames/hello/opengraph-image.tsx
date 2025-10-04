import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hello Frame";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      // FIX: Replaced `tw` prop with `style` for compatibility with JSX types.
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundColor: 'white' }}>
        {/* FIX: Replaced `tw` prop with `style` for compatibility with JSX types. */}
        <h1 style={{ fontSize: '60px' }}>Play 2048 in Farcaster!</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
