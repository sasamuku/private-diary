# Private Diary

## Overview

Private Diary is an open-source web application that allows you to easily build a privacy-focused personal diary site. By leveraging Supabase and Vercel, we provide a secure and personalized diary experience. Your secret diary is completely secure 🔐

## Key Features

### 🔒 Privacy-First
- End-to-end encryption
- Completely private diary site
- Prevents data access by third parties

### 🚀 Easy Deployment
- Simple setup using Supabase and Vercel
- Launch your personal diary site in minutes

### 🛠️ Customizability
- Open-source and freely forkable
- Easy to add and modify features
- Community contributions welcome

## Tech Stack

- Next.js
- TypeScript
- Supabase
- Vercel
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Supabase account
- Vercel account

### Installation Steps

1. **Clone the repository**:
   Download the project source code from the GitHub repository and navigate into the project directory:

   ```bash
   git clone https://github.com/sasamuku/private-diary.git
   cd private-diary
   ```

2. **Install dependencies**:
   Install all required dependencies for the project:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Configure the application by creating a `.env.local` file and adding the necessary Supabase connection details:

   - Create the `.env.local` file based on the `.env.template`.
   - Populate it with your Supabase project settings.

4. **Start the development server**:
   Launch the development server to test the application locally:

   ```bash
   npm run dev
   ```

## Local development

### Set up local Supabase

To set up Supabase in your local environment, follow these steps:

1. **Install Supabase CLI**:
   Ensure you have the Supabase CLI installed. Follow the official installation guide [here](https://supabase.com/docs/guides/cli#installation).

   ```bash
   npm install -g supabase
   ```

2. **Start the Supabase service**:
   Navigate to your project directory and run the following command to start Supabase locally:

   ```bash
   supabase start
   ```

3. **Verify local environment**:
   Once started, you can access the local Supabase Studio at `http://localhost:54323`.

4. **Sync your database schema**:
   If you have already pulled the database schema, apply it to your local database:

   ```bash
   supabase db reset
   ```

   This will ensure your local database matches the schema.

6. **Set up GitHub OAuth App**:
   To enable GitHub login locally:

   - Go to your GitHub account settings and navigate to **Developer Settings > OAuth Apps**.
   - Click **New OAuth App**.
   - Fill out the required fields:
     - **Application Name**: `Private Diary Local`
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization Callback URL**: `http://localhost:54321/auth/v1/callback`
   - Once created, copy the **Client ID** and **Client Secret**.

   Update the `.env.local` file with the following:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-local-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-local-supabase-anon-key>

   GITHUB_CLIENT_ID=<your-github-client-id>
   GITHUB_CLIENT_SECRET=<your-github-client-secret>
   ```

7. **Run the application**:
   Start your development server:

   ```bash
   npm run dev
   ```

For further details, refer to the [official Supabase local development documentation](https://supabase.com/docs/guides/local-development/overview) and [GitHub social login guide](https://supabase.com/docs/guides/auth/social-login/auth-github).

### Syncing Database Schema

When you make schema changes directly in the Supabase production environment, follow these steps to sync with your local environment:

1. **Pull Schema**:
   Fetch the production schema to your local environment:

   ```bash
   supabase db pull
   ```

2. **Update Type Definitions**:
   Generate TypeScript type definitions to reflect the schema changes:

   ```bash
   supabase gen types typescript --project-id <your-project-id> > lib/database.types.ts
   ```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Contributing

We welcome pull requests for feature additions and improvements! Please follow these guidelines:
- Maintain code style consistency
- Add tests
- Provide clear descriptions in your pull requests

## License

MIT License

## Support

Report bugs and feature requests through the issues tracker.
