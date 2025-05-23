import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "../users"

// Determine the URL based on environment
const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction 
  ? "https://illegal-mining-detection.vercel.app"
  : process.env.NEXTAUTH_URL || "http://localhost:3000";

// Configure NextAuth with Google and credentials providers
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Only set explicit redirect_uri in production
      ...(isProduction && {
        authorization: {
          params: {
            redirect_uri: `${BASE_URL}/api/auth/callback/google`,
          },
        },
      }),
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
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth', 
  },
  callbacks: {
    // Conditionally handle redirects based on environment
    redirect({ url, baseUrl }) {
      // For relative URLs, use the appropriate base URL
      if (url.startsWith('/')) {
        return `${BASE_URL}${url}`;
      }
      
      // For URLs that don't include our domain, redirect to our base URL
      if (!url.startsWith(BASE_URL)) {
        return BASE_URL;
      }
      
      // Otherwise return as is
      return url;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Help debug auth issues by enabling in both environments
  debug: true,
})

export { handler as GET, handler as POST } 