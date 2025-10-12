# Quick Authentication Setup Guide

Your authentication is already configured! You just need to get the OAuth credentials and add them to your environment variables.

## Step 1: Generate NextAuth Secret

Run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output - you'll need it for `NEXTAUTH_SECRET`.

## Step 2: Get Google OAuth Credentials

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Click "APIs & Services" → "Credentials" in the left sidebar
4. Click "CREATE CREDENTIALS" → "OAuth client ID"
5. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: Notebrain
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue" through the rest
6. Back to "Create OAuth client ID":
   - Application type: **Web application**
   - Name: Notebrain Local
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click "CREATE"
7. **Copy the Client ID and Client Secret** that appear

## Step 3: Get GitHub OAuth Credentials

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `Notebrain Local`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. **Copy the Client ID**
6. Click "Generate a new client secret"
7. **Copy the Client Secret** (you won't see it again!)

## Step 4: Create .env.local File

Create a file named `.env.local` in the root of your project with this content:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-your-generated-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=paste-your-google-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-google-client-secret-here

# GitHub OAuth
GITHUB_CLIENT_ID=paste-your-github-client-id-here
GITHUB_CLIENT_SECRET=paste-your-github-client-secret-here
```

Replace all the `paste-your-*-here` values with your actual credentials.

## Step 5: Run Your App

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and test the login!

## Quick Checklist

- [ ] Generated NEXTAUTH_SECRET
- [ ] Created Google OAuth app and got credentials
- [ ] Created GitHub OAuth app and got credentials
- [ ] Created .env.local file with all credentials
- [ ] Ran `npm install` and `npm run dev`
- [ ] Tested login at http://localhost:3000

## Troubleshooting

**"Configuration" error**: Check that .env.local exists and all variables are filled in

**"Redirect URI mismatch"**: Make sure you added `http://localhost:3000/api/auth/callback/google` and `http://localhost:3000/api/auth/callback/github` exactly

**"Invalid client"**: Double-check you copied the Client ID and Secret correctly (no extra spaces)

## Need Help?

The auth system is already built and working. You just need to:
1. Get the OAuth credentials from Google and GitHub (free, takes 5 minutes each)
2. Put them in .env.local
3. Run the app

That's it! 🚀
