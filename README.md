# Turborepo Starter Template

A reusable, framework-agnostic TypeScript monorepo starter powered by pnpm and Turborepo. It provides shared linting, formatting, TypeScript, testing, Git hooks, dependency updates, and CI without choosing an application framework for you.

> [!IMPORTANT]
> `apps/demo` and `packages/math` exist only to demonstrate an application consuming a compiled workspace package, including Turborepo build ordering, development watching, tests, and coverage. Delete both directories when starting a real project with this template, then add your own applications and packages and run `pnpm install` to refresh the lockfile.

## Included tooling

- pnpm 11 workspaces with strict dependency and engine settings
- Turborepo task orchestration, caching, transit nodes, and dependency-aware watch mode
- Node.js 24 and TypeScript 6
- Shared TypeScript configurations for base, Node.js, libraries, and React
- ESLint 10 with typescript-eslint and simple-import-sort
- Prettier 3 with a shared repository configuration
- Vitest 4 with a shared Node.js configuration and V8 coverage
- Husky, lint-staged, Commitlint, and branch-name validation
- GitHub Actions CI and grouped Dependabot updates

## Requirements

- Node.js 24
- pnpm 11.15 or newer
- Git

The repository includes `.nvmrc` and `.node-version`. pnpm 11 can resolve the configured package-manager version from `package.json`.

## Getting started

Create a repository from this template, then run:

```sh
nvm use
pnpm install
pnpm validate
pnpm dev
```

Before implementing the real project:

1. Delete `apps/demo` and `packages/math`; they are demonstration code only.
2. Rename the root package in `package.json`.
3. Add the required applications under `apps/` and shared packages under `packages/`.
4. Run `pnpm install` to update `pnpm-lock.yaml`.
5. Replace this README's project-specific introduction while retaining relevant development instructions.

## Repository structure

```text
.
├── apps/
│   └── demo/                 # Demonstration app; remove for real projects
├── packages/
│   ├── math/                 # Demonstration library; remove for real projects
│   ├── eslint-config/        # Shared ESLint configurations
│   ├── prettier-config/      # Shared Prettier configuration
│   ├── typescript-config/    # Shared TypeScript configurations
│   └── vitest-config/        # Shared Vitest configuration
├── .github/                  # CI, Dependabot, and pull-request template
├── .husky/                   # Git hooks and branch validation
├── pnpm-workspace.yaml
└── turbo.json
```

## Commands

| Command                   | Purpose                                                              |
| ------------------------- | -------------------------------------------------------------------- |
| `pnpm dev`                | Run dependency-aware development tasks with `turbo watch`            |
| `pnpm build`              | Build all packages in dependency order                               |
| `pnpm lint`               | Lint workspace packages                                              |
| `pnpm lint:fix`           | Apply safe ESLint fixes                                              |
| `pnpm format`             | Format the repository with Prettier                                  |
| `pnpm format:check`       | Check repository formatting                                          |
| `pnpm typecheck`          | Type-check workspace packages and tests                              |
| `pnpm test`               | Run tests once                                                       |
| `pnpm test:watch`         | Re-run affected tests when files change                              |
| `pnpm test:coverage`      | Run tests with V8 coverage                                           |
| `pnpm audit:dependencies` | Audit dependencies at moderate severity or higher                    |
| `pnpm validate`           | Run linting, formatting, type-checking, tests, and builds            |
| `pnpm clean`              | Remove package outputs, coverage, root dependencies, and Turbo state |

Use Turborepo filters for targeted work:

```sh
pnpm exec turbo run test --filter=@repo/math
pnpm exec turbo run build --filter=@repo/demo
```

## Adding packages

Every application or library should own its scripts and dependencies. Root scripts should only delegate repository tasks to Turborepo.

A TypeScript package can extend a shared configuration:

```json
{
  "extends": "@repo/typescript-config/library.json"
}
```

A Node-oriented package can consume the shared Vitest configuration with `vitest.config.js`:

```js
export { default } from '@repo/vitest-config/base'
```

Declare internal dependencies explicitly:

```json
{
  "dependencies": {
    "@repo/example": "workspace:*"
  }
}
```

This allows Turborepo to infer build order and cache invalidation correctly.

## Environment variables

Keep environment files inside the application that consumes them. Commit an app-local `.env.example`, but never commit populated `.env*` files.

The demo illustrates this pattern with:

```sh
cp apps/demo/.env.example apps/demo/.env.local
```

## Git conventions

Use branch names in this form:

```text
type/scope-description
```

Examples: `feat/auth-flow`, `fix/cache-key`, and `docs/setup-guide`.

Use Conventional Commit messages with a required scope:

```text
feat(auth): add session refresh
fix(build): correct package outputs
```

Git hooks perform the following checks:

- `pre-commit`: branch name, ESLint fixes, and Prettier formatting on staged files
- `commit-msg`: Conventional Commit validation
- `pre-push`: complete `pnpm validate`

## Continuous integration

GitHub Actions runs formatting, linting, type-checking, tests, dependency auditing, and builds for pull requests and pushes to `main` or `staging`. Dependabot groups updates by tooling category.

## License

Licensed under the [MIT License](LICENSE).
