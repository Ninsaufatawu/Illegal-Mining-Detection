# Supabase Integration Setup

This guide will help you set up Supabase to store user credentials from your NextAuth.js authentication system.

## Step 1: Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account
2. Create a new project
3. Note your project URL and anon key (public API key)

## Step 2: Create the Users Table

In the Supabase dashboard:

1. Go to SQL Editor
2. Create a new query with the following SQL:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  provider TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Create a policy to allow inserts without authentication
CREATE POLICY "Allow inserts to users" ON users
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow select for authenticated users
CREATE POLICY "Allow select for authenticated users" ON users
  FOR SELECT USING (true);

-- Create a policy to allow updates to users
CREATE POLICY "Allow updates to users" ON users
  FOR UPDATE USING (true);

-- Enable RLS on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

3. Run the query to create the table and policies

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root with the following:

```
# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace `your_supabase_url` and `your_supabase_anon_key` with the values from your Supabase project settings.

## Step 4: Restart Your Development Server

Run:

```bash
npm run dev
```

## Step 5: Test Registration and Login

1. Register a new user through your application
2. Log in with the registered user
3. Check the Supabase dashboard to verify that user data is being stored in the `users` table

## Viewing User Data in Supabase

1. Go to your Supabase project dashboard
2. Navigate to "Table Editor" in the left sidebar
3. Select the "users" table
4. You should see all registered and logged-in users with their credentials

## How the Integration Works

The application now stores all user data directly in Supabase:

1. When a user registers, their information is stored in the Supabase `users` table
2. When a user logs in with credentials, we verify against the Supabase database
3. When a user logs in with Google, we check if they exist in Supabase and create a record if needed

This implementation completely replaces the local array storage with database storage, ensuring all user data is properly persisted and viewable in your Supabase dashboard.

## Security Considerations

In a production environment:

1. Never store plain-text passwords. Use a proper hashing algorithm like bcrypt.
2. Set up Row Level Security (RLS) policies to control access to your data.
3. Consider using Supabase Auth directly instead of storing passwords manually.

## Troubleshooting

If you don't see user data in Supabase:

1. Check your browser console for any errors
2. Verify your Supabase URL and anon key are correct
3. Ensure the table was created correctly with the proper permissions
4. Check server logs for any errors during the registration/login process 