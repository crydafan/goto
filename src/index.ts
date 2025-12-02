import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "public",
      prefix: "/",
    })
  )
  .get("/:id", ({ params }) => `${params.id}`)
  .post("/", () => "Hello World!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
