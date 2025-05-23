import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "../users"

// The production URL
const PRODUCTION_URL = "https://illegal-mining-detection.vercel.app";

// Configure NextAuth with Google and credentials providers
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Add explicit configuration for authorization URL
      authorization: {
        params: {
          // Force specific redirect_uri parameter instead of deriving it from request
          redirect_uri: `${PRODUCTION_URL}/api/auth/callback/google`,
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        // In a real app, look up the user in your database
        const user = users.find(user => user.email === credentials.email)
        
        // Check if user exists and password matches
        // In production, you would use a proper password comparison method
        if (user && user.password === credentials.password) {
          // Return only what you want to store in the token
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }
        
        return null
      },
    }),
  ],
  // Explicitly set the base URL to the production URL
  // This overrides any dynamic determination of the URL
  basePath: "/api/auth",
  baseUrl: PRODUCTION_URL,
  
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth', 
  },
  callbacks: {
    // Force all OAuth callbacks to use the production URL
    redirect({ url, baseUrl }) {
      // Always use the production URL for redirects
      if (url.startsWith('/')) {
        return `${PRODUCTION_URL}${url}`
      }
      
      // If it's not a relative URL and not starting with our production domain,
      // redirect to the home page of our production site
      if (!url.startsWith(PRODUCTION_URL)) {
        return PRODUCTION_URL
      }
      
      return url
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  // Add debug mode to help troubleshoot the issue
  debug: process.env.NODE_ENV !== "production",
})

export { handler as GET, handler as POST } 