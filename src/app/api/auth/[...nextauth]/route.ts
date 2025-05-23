import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "../users"

// Configure NextAuth with Google and credentials providers
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    error: '/auth', // Error code passed in query string as ?error=
  },
  callbacks: {
    // Force all OAuth callbacks to use the production URL
    redirect({ url, baseUrl }) {
      // Always use the production URL for redirects
      const productionUrl = "https://illegal-mining-detection.vercel.app";
      
      // If the URL is already using the production domain, return it as is
      if (url.startsWith(productionUrl)) {
        return url;
      }
      
      // For relative URLs, append them to the production URL
      if (url.startsWith('/')) {
        return `${productionUrl}${url}`;
      }
      
      // For other URLs, just use the production URL
      return productionUrl;
    },
    
    // Keep existing callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST } 