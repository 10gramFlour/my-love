import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ACCESS_COOKIE_NAME,cookieOptions,SESSION_SECONDS,TOKEN_AUDIENCE,TOKEN_ISSUER,TOKEN_TYPE } from "./constants";
import { getServerEnv } from "@/lib/env/server";
const b64=(value:Buffer|string)=>Buffer.from(value).toString("base64url"); const unb64=(value:string)=>Buffer.from(value,"base64url");
function sign(data:string){return b64(createHmac("sha256",getServerEnv().SESSION_SECRET).update(data).digest())}
export async function createAccessSession(){const env=getServerEnv(),now=Math.floor(Date.now()/1000);const head=b64(JSON.stringify({alg:"HS256",typ:"JWT"}));const body=b64(JSON.stringify({type:TOKEN_TYPE,version:env.AUTH_COOKIE_VERSION,iat:now,exp:now+SESSION_SECONDS,iss:TOKEN_ISSUER,aud:TOKEN_AUDIENCE}));(await cookies()).set(ACCESS_COOKIE_NAME,`${head}.${body}.${sign(`${head}.${body}`)}`,cookieOptions)}
export async function verifyAccessSession(){try {const token=(await cookies()).get(ACCESS_COOKIE_NAME)?.value;if(!token)return false;const [head,body,sig,...extra]=token.split(".");if(!head||!body||!sig||extra.length)return false;const expected=Buffer.from(sign(`${head}.${body}`));const actual=unb64(sig);if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return false;const p=JSON.parse(unb64(body).toString());const e=getServerEnv();return p.type===TOKEN_TYPE&&p.version===e.AUTH_COOKIE_VERSION&&p.iss===TOKEN_ISSUER&&p.aud===TOKEN_AUDIENCE&&Number.isInteger(p.exp)&&p.exp>Math.floor(Date.now()/1000)}catch{return false}}
export async function deleteAccessSession(){(await cookies()).set(ACCESS_COOKIE_NAME,"",{...cookieOptions,maxAge:0})}
