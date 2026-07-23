import "server-only";
import { getServerEnv } from "@/lib/env/server";
/** Minimal server-only Storage REST access; no browser client or auth persistence. */
export async function downloadPrivateObject(path:string,range?:string|null){const env=getServerEnv();return fetch(`${env.SUPABASE_URL}/storage/v1/object/${encodeURIComponent(env.SUPABASE_PRIVATE_BUCKET)}/${path.split("/").map(encodeURIComponent).join("/")}`,{headers:{Authorization:`Bearer ${env.SUPABASE_SECRET_KEY}`,...(range?{Range:range}:{})},cache:"no-store"})}
