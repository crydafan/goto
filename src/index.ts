import { Elysia, redirect, status, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { shortLinksTable } from "./db/schema";
import { randomUUIDv7 } from "bun";

const generateShortCode = () => randomUUIDv7().replaceAll("-", "").slice(0, 16);

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "public",
      prefix: "/",
    })
  )
  .get("/:id", async ({ params }) => {
    const shortLink = await db.query.shortLinksTable.findFirst({
      where: eq(shortLinksTable.short, params.id),
    });

    if (!shortLink) {
      return status(404);
    }

    return redirect(shortLink.original, 302);
  })
  .post(
    "/",
    async ({ body }) => {
      const short = generateShortCode();

      const result = await db
        .insert(shortLinksTable)
        .values({
          original: body.url,
          short,
        })
        .returning({
          original: shortLinksTable.original,
          short: shortLinksTable.short,
          createdAt: shortLinksTable.createdAt,
        });

      return result[0];
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    }
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
