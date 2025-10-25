# GitHub Actions CI/CD Workflows

This directory contains automated CI/CD workflows for the JetVision Multi-Agent System.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `main`, `develop`, or `feat/**` branches
- Pull requests to `main` or `develop`

**Jobs:**

#### Build and Test
- Tests on Node.js 18.x and 20.x
- Installs dependencies
- Builds Next.js application
- Runs tests (if available)

#### Code Quality
- TypeScript type checking (informational only)
- Pre-existing type errors won't fail the build

#### Deploy Preview
- Deploys to Vercel preview environment on pull requests
- Requires Vercel secrets (see setup below)

#### Deploy Production
- Deploys to Vercel production on push to `main`
- Requires successful build and code quality checks

### 2. Hydration Error Detection (`hydration-checks.yml`)

**Triggers:**
- Push to `main`, `develop`, or `feat/**` branches
- Pull requests to `main` or `develop`

**Checks:**
- Scans for common hydration error patterns
- Detects `useState` with browser API access
- Verifies `useEffect` usage in hooks with browser APIs
- Checks build output for hydration warnings

## Setup Instructions

### Required GitHub Secrets

For Vercel deployment to work, add these secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
VERCEL_TOKEN              # Your Vercel API token
VERCEL_ORG_ID            # Your Vercel organization ID
VERCEL_PROJECT_ID        # Your Vercel project ID
NEXT_PUBLIC_SUPABASE_URL # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Your Supabase anon key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY # Your Clerk publishable key
```

### Getting Vercel Credentials

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Get your credentials
vercel env pull .env.local
cat .vercel/project.json  # Contains projectId and orgId
```

### Note on Package Manager

This project uses **pnpm** instead of npm. The workflows are configured to:
- Use `pnpm/action-setup@v4` to install pnpm
- Cache dependencies using `pnpm-lock.yaml`
- Run `pnpm install --frozen-lockfile` for reproducible builds

### Optional: Skip Vercel Deployment

If you don't want Vercel deployment, the workflows will still run build and test jobs. The deployment jobs will be skipped if `VERCEL_TOKEN` is not set.

## Status Badges

Add these to your README.md:

```markdown
![CI/CD](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/CD%20Pipeline/badge.svg)
![Hydration Checks](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Hydration%20Error%20Detection/badge.svg)
```

## Workflow Features

### ✅ What Works Now
- Automated builds on every push and PR
- Multi-version Node.js testing (18.x, 20.x)
- Build verification
- Hydration error pattern detection
- Vercel deployment (when configured)

### 🚧 Pending Improvements
- ESLint configuration and checks
- Unit test execution (once test suite is complete)
- Code coverage reports
- Performance budgets
- Lighthouse CI checks

## Troubleshooting

### Build Fails with Environment Variable Errors

The workflow uses `SKIP_ENV_VALIDATION: true` to allow builds without all env vars. If you need specific variables for the build, add them to GitHub Secrets.

### Type Check Failures

Type check is currently informational only (`continue-on-error: true`). This allows the build to proceed while you fix pre-existing type errors.

### Vercel Deployment Not Running

1. Verify all Vercel secrets are added
2. Check that secrets are available in your repository settings
3. Ensure the branch name matches the trigger conditions

## Local Testing

Test the build locally before pushing:

```bash
# Install dependencies
pnpm install

# Run type check
pnpm run type-check

# Build the application
pnpm run build

# Run tests
pnpm test
```

## Contributing

When adding new workflows:
1. Test locally using [act](https://github.com/nektos/act)
2. Use `continue-on-error: true` for informational checks
3. Document required secrets in this README
4. Add appropriate triggers and conditions
