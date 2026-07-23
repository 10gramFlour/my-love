export const ACCESS_COOKIE_NAME="my_love_access"; export const SESSION_SECONDS=60*60*24*30; export const TOKEN_ISSUER="my-love"; export const TOKEN_AUDIENCE="site-access"; export const TOKEN_TYPE="shared-password-session";
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge:SESSION_SECONDS};
