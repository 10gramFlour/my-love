import "server-only";
import { z } from "zod";
const schema=z.object({SITE_PASSWORD_HASH:z.string().min(1),SESSION_SECRET:z.string().min(32),AUTH_COOKIE_VERSION:z.coerce.number().int().positive(),SUPABASE_URL:z.string().url(),SUPABASE_SECRET_KEY:z.string().min(1),SUPABASE_PRIVATE_BUCKET:z.string().trim().min(1)});
export type ServerEnv=z.infer<typeof schema>;
export function getServerEnv():ServerEnv { const parsed=schema.safeParse(process.env); if(!parsed.success) throw new Error("Server configuration is incomplete or invalid. Check required environment variable names."); return parsed.data; }
