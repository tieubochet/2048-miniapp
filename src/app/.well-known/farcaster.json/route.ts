export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjI2MDI5OSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGE1NjNDYTRFMGZmMjIzNjMzMkUyRkRmRDkxZkZEOTZlNTk0NzQ5RkYifQ",
      "payload": "eyJkb21haW4iOiJodHRwczovLzIwNDgtbWluaWFwcC12Mi52ZXJjZWwuYXBwLyJ9",
      "signature": "wimPDGW+TBZWqE3AuRrUYqPXZk0WRDsgEvcvETJP93xU44vJnUFLLs+g5DJhMTy4cltlce7Hi0za8S7hKGPVMRs="
    },
    frame: {
      "name": "Game 2048 Mini App",
      "version": "1",
      "iconUrl": "https://https://2048-miniapp-v2.vercel.app/icon.png",
      "homeUrl": "https://https://2048-miniapp-v2.vercel.app/",
      "imageUrl": "https://https://2048-miniapp-v2.vercel.app/image.png",
      "splashImageUrl": "https://https://2048-miniapp-v2.vercel.app/splash.png",
      "splashBackgroundColor": "#8e71a7",
      "webhookUrl": "https://https://2048-miniapp-v2.vercel.app/api/webhook",
      "subtitle": "Game 2048 Mini App",
      "description": "Game 2048 Mini App",
      "primaryCategory": "games"
    },
  };

  return Response.json(config);
}
