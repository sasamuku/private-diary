# Technical Context: Private Diary

## Technologies Used
Private Diary is built using a modern web development technology stack:

### Frontend
- **Next.js**: React-based framework supporting server-side rendering (SSR) and static site generation (SSG)
- **TypeScript**: Enhanced safety and development efficiency through static typing
- **TailwindCSS**: Utility-first CSS framework
- **React**: UI component library

### Backend
- **Supabase**: Open-source Firebase alternative
  - **PostgreSQL**: Powerful relational database
  - **Authentication System**: User authentication and management
  - **Row Level Security (RLS)**: Database-level access control

### Deployment
- **Vercel**: Hosting and deployment for Next.js applications
- **GitHub**: Source code and version management

## Development Setup
To set up the development environment for Private Diary, follow these steps:

### Prerequisites
- **Node.js**: v18 or higher
- **npm**, **yarn**, or **pnpm**: Package manager
- **Supabase account**: For backend services
- **Vercel account**: For deployment (optional)

### Local Development Environment Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/sasamuku/private-diary.git
   cd private-diary
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   - Copy `.env.template` to `.env.local`
   - Fill in the necessary values from your Supabase project settings

4. **Set up local Supabase**:
   - Install Supabase CLI: `npm install -g supabase`
   - Start local service: `supabase start`
   - Apply database schema: `supabase db reset`

5. **Set up GitHub OAuth App** (for local development):
   - Create a new OAuth App from your GitHub account settings
   - Enter the required information:
     - Application name: `Private Diary Local`
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:54321/auth/v1/callback`
   - Add the obtained Client ID and Client Secret to `.env.local`

6. **Start the development server**:
   ```bash
   npm run dev
   ```
   - Local application is accessible at `http://localhost:3000`
   - Local Supabase Studio is accessible at `http://localhost:54323`

## Technical Constraints
1. **Browser Encryption API Dependency**:
   - Client-side encryption depends on modern browsers' Web Crypto API
   - Functionality may be limited in older browsers

2. **Supabase Dependency**:
   - Backend is heavily dependent on Supabase
   - Supabase limitations (e.g., free plan constraints) may affect the application

3. **Authentication Methods**:
   - Currently only supports GitHub authentication
   - Adding other authentication providers requires additional configuration

4. **Database Structure**:
   - Schema changes require careful management
   - Schema changes are tracked through migrations

## Dependencies
The main dependencies are as follows (from package.json):

### Main Dependencies
- Next.js
- React
- TypeScript
- TailwindCSS
- Supabase JavaScript Client

### Development Dependencies
- ESLint
- Biome (code formatter and linter)
- TypeScript type definitions
- Postcss (for TailwindCSS processing)

## Database Schema
The Supabase database includes the following main tables (inferred from migration files):

1. **User-related Tables**:
   - `auth.users`: User information managed by Supabase
   - Custom user profile information (if present)

2. **Diary Entry Table**:
   - Table for storing diary posts
   - Includes fields such as user ID, date, content, favorite status

3. **Security Policies**:
   - Row Level Security (RLS) policies ensure users can only access their own data

## Environment Variables
The application depends on the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=<Supabase-project-URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase-anonymous-key>

# For GitHub authentication (optional)
GITHUB_CLIENT_ID=<GitHub-client-ID>
GITHUB_CLIENT_SECRET=<GitHub-client-secret>
```

## Deployment Process
1. **Deploy to Vercel**:
   - Connect GitHub repository to Vercel
   - Set up necessary environment variables
   - Click deploy button or set up automatic deployment

2. **Supabase Project Setup**:
   - Create a Supabase project for production
   - Apply database schema
   - Set up authentication provider (GitHub)
   - Verify RLS policies

3. **Synchronize Environment Variables**:
   - Update environment variables in Vercel project settings
   - Set Supabase connection information

## Database Schema Synchronization
Process for synchronizing schema changes from production to local environment:

1. **Pull Schema**:
   ```bash
   supabase db pull
   ```

2. **Update Type Definitions**:
   ```bash
   supabase gen types typescript --project-id <project-id> > lib/database.types.ts
   ```

## Performance Considerations
- Optimize initial load time using Next.js's SSR and SSG
- Minimize CSS bundle size with TailwindCSS
- Potential computational overhead from client-side encryption
- Supabase query optimization may be necessary in some cases

## Security Considerations
- Implementation and verification of client-side encryption
- Setting and maintaining appropriate RLS policies
- Secure management of environment variables
- Authentication flow security
- XSS and CSRF protection
