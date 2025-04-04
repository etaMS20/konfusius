# Introduction

This repo contains the Angular application (soon) serving the **Konfusius Festival** website.

The app uses _WordPress_ (WP) + _WooCommerce_ (WC) backend as **headless CMS** to manage the festival's ticket sales.

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

   The application requires certain env variables to function (like guest password, backend url , etc.)

   In development config, the Application reads the `.env` file on runtime using a custom `webpack.config.ts` setup. Devs must request the required Secrets from WP admins.

   ```json
   serve.configurations.development:
   {
      "buildTarget": "konfusius:build:development",
      "proxyConfig": "proxy.conf.json"
   },
   ```

---

## Serving the app locally

to serve the app u can use angular cli commands from project root

```bash
ng serve
```

Open a browser and head to [localhost:4200](http://localhost:4200/)

---

## Deploying the app on wordpress

On git-pushes the app fill be automatically deployed to wordpress using `.github/workflows/deploy.yml`

```
 ng build --configuration=production --base-href=/festival/
```

---

## Dev Notes

### Known Issues

- privacy page renders without content on brave browser

### Planned Features

- custom payment method in backend (can have)
- implement Ui for crew members with website settings (can have)
- activate/implement wp-nonces (should have)
- smooth scrolling navigation (can have)
- use JWT token for all requests (should have)
- limit order to 1 per email (can have)

### Useful Links

- alternative deployment method: https://dev.to/stephenwhitmore/take-your-wordpress-site-farther-with-angular-3o6p
- mat-icons: https://mui.com/material-ui/material-icons/?query=foo
