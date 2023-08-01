export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/dashboard/:path*"] }; // Cuando se haga signout se elimina el token y solo permitirá el acceso a login