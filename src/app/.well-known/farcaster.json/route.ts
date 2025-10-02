export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjI2MDI5OSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGE1NjNDYTRFMGZmMjIzNjMzMkUyRkRmRDkxZkZEOTZlNTk0NzQ5RkYifQ",
      "payload": "eyJkb21haW4iOiIyMDQ4LW1pbmlhcHAtdjIudmVyY2VsLmFwcCJ9",
      "signature": "nbeotrn5wMHS/j2koYYeN/HR9s8KOfXhdJFwbwhvXl9g5w3kdTWng6tCq3STovgJ4jJB0ZzpP6VUkvYOWNm65Bw="
    },
    miniapp: {
      "name": "Game 2048 Mini App",
      "version": "1",
      "iconUrl": "https://2048-miniapp-v2.vercel.app/icon.png",
      "homeUrl": "https://2048-miniapp-v2.vercel.app/",
      "imageUrl": "https://2048-miniapp-v2.vercel.app/image.png",
      "splashImageUrl": "https://2048-miniapp-v2.vercel.app/splash.png",
      "splashBackgroundColor": "#8e71a7",
      "webhookUrl": "https://2048-miniapp-v2.vercel.app/api/webhook",
      "subtitle": "Game 2048 Mini App",
      "description": "Game 2048 Mini App",
      "primaryCategory": "games"
    },
  };

  return Response.json(config);
}