import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// In a production app, you would use a real database
// This is just a simple implementation for demonstration
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123", // In production, this would be hashed
  },
]

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