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

4. API Key Requirement

   In the current setup, this app needs to access the [WC REST API](https://woocommerce.github.io/woocommerce-rest-api-docs). We therefore need to create a `.env` file in the project root containing the Keys:

   ```.env
   CONSUMER_KEY=<wc-api-key>
   CONSUMER_SECRET=<wc-api-secret>
   ```

   The Application reads the `.env` file on runtime using a custom webpack setup.

   **This whole requirement is (hopefully) deprecated soon**, once the wp-json backend has been setup to allow unauthorized request against the `/wc/store/v1` endpoint [WC Store API](https://github.com/woocommerce/woocommerce-blocks/tree/trunk/src/StoreApi).

   Devs must request the keys from WP admins.

---

## Serving the app locally

to serve the app u can use angular cli commands from project root

```bash
ng serve
```

Open a browser and head to [localhost:4200](http://localhost:4200/)

---

## Current backend/devOps TODOS

- set WP server to allow cross-origin requests (CORS) as we currently have to proxy local HTTP requests to the WC backend
- configure server to allow unauthenticated requests against `/wc/store/v1` endpoint
- add appropriate image meta-data in WP backend, so we don't have to map the image paths

## Current frontend Ideas

- disable ticket route when store not available
- change login form error detection
- move loading indicator to component
