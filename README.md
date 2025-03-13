# Introduction

This repo contains the Angular application (soon) serving the **Konfusius Festival** website.

The app uses _WordPress_ (WP) + _WooCommerce_ (WC) backend as **headless CMS** to manage the festival's ticket sales.

The app is still in early development.

---

# Development Setup

1. Install latest Node.js
2. Install `pnpm` (package manager)

   ```bash
   npm install -g pnpm
   ```

3. Install Dependencies

   ```bash
   pnpm i
   ```

4. Env Variables

   The application required certain env variables to function (like guest password, backend url , etc.)

   In development config, the Application reads the `.env` file on runtime using a custom `webpack.config.ts` setup. Devs must request the required Secrets from WP admins.

   ```json
   serve.configurations.development:
   {
      "buildTarget": "konfusius:build:development",
      "proxyConfig": "proxy.conf.json"
   },
   ```

   In production config, the variables are set by ci configuration

---

## Serving the app locally

to serve the app u can use angular cli commands from project root

```bash
ng serve
```

Open a browser and head to [localhost:4200](http://localhost:4200/)

---

## Current Setup to build the app for wordpress

1. Compile with production config and custom base-href

```
 ng build --configuration=production --base-href=/festival/
```

2. Upload the local content of `dist/konfusius` to `/festival` which is located on the wordpress root

---

## Current backend/devOps TODOS

- set WP server to allow cross-origin requests (CORS) as we currently have to proxy local HTTP requests to the WC backend
- configure server to allow unauthenticated requests against `/wc/store/v1` endpoint
- add appropriate image meta-data in WP backend, so we don't have to map the image paths

## Current frontend Ideas

- disable ticket route when store not available
- change login form error detection
- move loading indicator to component
