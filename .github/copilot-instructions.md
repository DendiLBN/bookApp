## Copilot / AI agent instructions for BookApp

This repository contains a React + TypeScript frontend (Vite) and a NestJS backend. The goal of these instructions is to help an AI coding agent become productive immediately by describing the architecture, conventions, important files, and developer workflows.

- **Architecture (big picture):**
  - Backend: NestJS app in `backend/` with modular structure under `backend/src/modules` (notably `auth`, `books`, `user`). Shared utilities and DTOs live under `backend/src/shared` and `backend/src/common` (strategies, guards, decorators).
  - Frontend: Vite + React + TypeScript in `frontend/`. State is managed with Redux Toolkit and RTK Query; API slices live under `frontend/src/store/api`. UI uses Ant Design and notifications/modals are provided through context providers in `frontend/src/common/contexts`.
  - Data flow: frontend RTK Query endpoints call backend controllers (`backend/src/modules/*/*.controller.ts`). Authentication uses JWT with access + refresh tokens implemented in `backend/src/common/strategy` and enforced with guards in `backend/src/common/guards`.

- **Key files and examples to reference:**
  - Backend run/test scripts: `backend/package.json` (scripts: `start:dev`, `build`, `test`, `test:e2e`).
  - Frontend run/build: `frontend/package.json` (scripts: `dev`, `build`, `preview`).
  - Auth strategies and guards: `backend/src/common/strategy/acces-token-strategy.ts`, `refresh-token-strategy.ts`, `backend/src/common/guards/*`.
  - Example frontend API & hook usage: `frontend/src/features/login-page/hooks/useLoginUser.ts` — shows RTK Query mutation usage pattern with `onSuccess` / `onError` callbacks and notification context.
  - Notifications/context: `frontend/src/common/contexts/antd-notification-context.tsx` and `modal-context.tsx` (use these to surface UI feedback consistently).

- **Project-specific conventions & patterns:**
  - RTK Query endpoints return hooks from `frontend/src/store/api/*`. Mutations are consumed like `const [loginUser] = useLoginUserMutation()` and callers often pass `onSuccess`/`onError` callbacks into the request object.
  - Backend organizes features as Nest modules (`*.module.ts`) with corresponding `*.controller.ts`, `*.service.ts`, `dto/`, and `schema/` folders.
  - Auth flow uses both access and refresh tokens; token logic and helpers are in `backend/src/common`. Look for `get-users-from-token-decorators.ts` for request user extraction patterns.
  - Environment secrets (JWT keys) are expected in `.env` (README notes sensitive keys). Avoid hardcoding secrets in generated code.

- **Developer workflows (practical commands):**
  - Start backend dev server:

    cd backend
    npm install
    npm run start:dev

  - Start frontend dev server:

    cd frontend
    npm install
    npm run dev

  - Run backend tests (unit/e2e):

    cd backend
    npm run test
    npm run test:e2e

- **Testing & CI notes:**
  - Backend uses Jest, `supertest` and `mongodb-memory-server` for tests. Look at `backend/package.json` jest config.
  - Linting/format: backend has `eslint`/`prettier` scripts; frontend has `eslint` script. Prefer using existing scripts.

- **What to change vs what to preserve:**
  - Preserve folder layout and public API surface (module/controller/service names) when editing backend controllers or DTOs — tests and consumers depend on shape.
  - On frontend, follow existing patterns: RTK Query slices under `store/api`, `use*` hooks in `features/*/hooks`, and centralized contexts for notifications/modals.

- **When making code changes, reference these examples:**
  - To add an auth endpoint, mirror `backend/src/modules/auth` structure (controller -> service -> dto -> schema).
  - To add a new API call in the frontend, add an RTK Query endpoint in `frontend/src/store/api/*` and expose a hook; follow `useLoginUser.ts` style for callbacks.

- **Merging existing AI instructions:**
  - If an existing `.github/copilot-instructions.md` is present, merge only non-duplicative, up-to-date lines (prefer the repository's README-backed specifics above).

If anything above is unclear or you want me to include more examples (controller/service snippets, or RTK Query endpoint templates), tell me which area to expand.
