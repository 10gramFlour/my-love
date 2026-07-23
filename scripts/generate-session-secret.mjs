import { randomBytes } from "node:crypto"; console.log("Set SESSION_SECRET to:\n\n"+randomBytes(32).toString("base64url"));
