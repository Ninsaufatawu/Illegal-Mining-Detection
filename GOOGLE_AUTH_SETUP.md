# Setting Up Google OAuth for MineGuard

This guide will walk you through setting up Google OAuth for authentication in the MineGuard application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page, then click "New Project"
3. Give your project a name (e.g., "MineGuard Auth") and click "Create"

## Step 2: Configure OAuth Consent Screen

1. In your Google Cloud Project, navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the user type (unless you have a Google Workspace organization)
3. Fill out the required information:
   - App name: MineGuard
   - User support email: Enter your email address
   - Developer contact information: Enter your email address
4. Click "Save and Continue"
5. Skip adding scopes and click "Save and Continue"
6. Add test users if you're in testing mode, then click "Save and Continue"
7. Review your settings and click "Back to Dashboard"

## Step 3: Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. Select "Web application" as the Application type
4. Name your client (e.g., "MineGuard Web Client")
5. Add authorized JavaScript origins:
   - For local development: `http://localhost:3000`
   - For production: Add your domain (e.g., `https://yourapp.com`)
6. Add authorized redirect URIs:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourapp.com/api/auth/callback/google`
7. Click "Create"
8. Note your Client ID and Client Secret - you'll need these for your application

## Step 4: Set up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_randomly_generated_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

For production, set these environment variables on your hosting platform.

## Step 5: Generate a NextAuth Secret

You can generate a random string for NEXTAUTH_SECRET using this command:

```bash
openssl rand -base64 32
```

## Notes

- For development, Google allows authentication with any email
- For production with external users, you'll need to verify your app through Google's verification process
- Keep your Client Secret secure and never commit it to your repository 