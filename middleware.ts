import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  console.log("ROUTE: ", req.nextUrl.pathname)
  console.log("IS LOGGEDIN? ", isLoggedIn)
})

// Matcher defines paths will invoke Middleware
// The regular expression indicates all paths in this App.
// To identify what is/are public routes, define in auth() definition
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}