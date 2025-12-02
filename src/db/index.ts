import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle(Bun.env.DATABASE_URL!, { schema });
