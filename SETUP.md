# Notebrain Authentication Setup

This guide will help you set up Google and GitHub authentication for Notebrain.

## Prerequisites

- A Google Cloud account
- A GitHub account
- Node.js installed

## Setup Instructions

### 1. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if prompted
6. Select "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the Client ID and Client Secret

### 3. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Notebrain
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID
6. Generate a new Client Secret and copy it

### 4. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret
   
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

### 5. Run the Application

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and test the authentication by clicking "Log in" or "Sign up".

## Production Deployment

When deploying to production (e.g., Vercel):

1. Update `NEXTAUTH_URL` to your production domain
2. Add production callback URLs to Google and GitHub OAuth apps
3. Set all environment variables in your hosting platform's dashboard

## Troubleshooting

- **"Configuration error"**: Check that all environment variables are set correctly
- **"Redirect URI mismatch"**: Ensure the callback URLs in Google/GitHub match your `NEXTAUTH_URL`
- **"Invalid client"**: Verify your Client ID and Client Secret are correct

## Security Notes

- Never commit `.env.local` to version control
- Keep your Client Secrets secure
- Regenerate secrets if they are exposed
- Use different OAuth apps for development and production
