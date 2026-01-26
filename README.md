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

   The application requires certain env variables to function. It is build with `@ngx-env/builder` to support reading from a `dotenv` on runtime.
   Devs must request the required Secrets used in `env` from WP admins.

5. Dev setup on localhost uses a proxy to enable cookies-setters with CORS restriction

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

On git-pushes the app fill be automatically deployed to wordpress using `.github/workflows/ci.yml`.

```
 ng build --configuration=production --base-href=/festival/
```

---

## Dev Notes

### Known Issues

- privacy page renders without content on brave browser
- possible compatibility issues with older browser (most notably IOS/safari) versions
- env settings is sometimes unreliable

### Planned Features (for 2026)

- custom payment method in backend (can have)
- activate/implement wp-nonces (should have)
- smooth scrolling navigation (can have)
- use JWT token for all requests (should have)
- limit order to 1 per unique name per year (can have)
- email-filter in overview (can have)
- enhanced email templates (can have)
- move deployment from ftp to ssh (should have)
- install wp-cli to dev console (can have)
- migrate to tailwind (can have)
- clean-up backend, data-retention etc. (can have)
- extend crew-area features: generate excel, make custom orders etc (can have)

### Useful Links

- alternative deployment method: https://dev.to/stephenwhitmore/take-your-wordpress-site-farther-with-angular-3o6p
- mat-icons: https://mui.com/material-ui/material-icons/?query=foo

## Dev Notes

- Awareness -> 2 per shift
- Early Bird -> minus 10
- Ticket Preis bleibt
- Deadline: Anfang Mai
- Kochen auch am Montag
- Kochen - 1 Person weniger
