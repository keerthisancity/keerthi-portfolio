# Keerthi Portfolio Frontend

A responsive personal portfolio for Keerthi N. The site presents profile information, skills, work experience, education, projects, and achievements, with content loaded from the portfolio API. It includes light and dark themes, responsive navigation, and links for contacting Keerthi and viewing a resume.

## Technology

- React 18 and TypeScript
- Vite 6 for development and production builds
- Axios for HTTP requests
- Lucide React for icons
- Node.js static server and API proxy in `server.cjs`
- Azure Static Web Apps configuration in `swa-cli.config.json`

## Requirements

- Node.js 20 or later
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   cp .env.example .env
   ```

   PowerShell equivalent:

   ```powershell
   Copy-Item .env.example .env
   ```

   `VITE_API_BASE_URL` defaults to `/api` when it is not set. The Vite development server proxies `/api` to the portfolio backend. The example points directly to `https://keerthiportfolioapi.azurewebsites.net/api`.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open the URL printed by Vite, normally `http://localhost:5173`.

## Build and Preview

Create a production build (TypeScript check followed by the Vite build):

```bash
npm run build
```

Preview the generated `dist` build locally:

```bash
npm run preview
```

## API

The frontend uses `VITE_API_BASE_URL` as its API base URL, defaulting to `/api`. Each endpoint below uses the HTTP `GET` method and returns JSON.

| Endpoint | Data |
| --- | --- |
| `/bio` | Profile and contact information |
| `/skills` | Skills and categories |
| `/experience` | Work experience |
| `/education` | Education history |
| `/projects` | Portfolio projects |
| `/achievements` | Achievements |

With the example backend URL, the full endpoint for bio is `https://keerthiportfolioapi.azurewebsites.net/api/bio`; the other endpoints follow the same base URL and paths above. During local development, Vite proxies requests from `/api` to `https://keerthiportfolioapi.azurewebsites.net`.

## Azure Static Web Apps

The included `swa-cli.config.json` sets the app location to the repository root, the build output to `dist`, the build command to `npm run build`, and the development server to `npm run dev`. Configure `VITE_API_BASE_URL` in the Static Web Apps application settings if the deployed frontend should use a different API base URL.