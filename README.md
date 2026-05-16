# Onboarding Flow App

A multi-step onboarding application built with React, TypeScript, Redux Toolkit, Formik, Zod, and Chakra UI.

## Features

- Login authentication with hardcoded credentials
- Multi-step onboarding flow
- Redux Toolkit state management
- localStorage persistence
- Protected routes
- Resume onboarding progress after refresh/browser close
- Form validation using Zod + Formik

## Demo Credentials

```txt
Username: user123
Password: password123
```

## Onboarding Steps

1. Personal Profile
2. Favorite Songs
3. Payment Information
4. Success Screen

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- Formik
- Zod
- Chakra UI
- Vite

## Installation

```bash
git clone <repository-url>

cd <project-name>

npm install

npm run dev
```

## Routing Flow

- `/login` → Public route
- `/onboarding` → Authenticated users only
- `/dashboard` → Requires completed onboarding

## Persistence

Application state is persisted in `localStorage` so users can continue onboarding from where they left off.
