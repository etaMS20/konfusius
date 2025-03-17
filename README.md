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

## Current Setup to host the app on wordpress

1. Compile with production config and custom base-href

```
 ng build --configuration=production --base-href=/festival/
```

2. Upload the local content of `dist/konfusius` to `/festival` which is located at the wordpress root

---

## Dev Notes

### Known Issues

- Image Slider image index can overflow
- privacy page renders without content on brave browser

### Planned Features

- custom payment method in backend (can have)
- implement [fullscreen directive](https://medium.com/@milan.barac/angular-fullscreen-cd8b788c348f) (can have)
- implement Ui for crew members with website settings (can have)
- activate/implement wp-nonces (should have)
- give order url hashes instead of numbers (should have)
- smooth scrolling navigation (can have)
- use JWT token for all requests (can have)
- ci deployment to hosting (should have)

### Useful Links

- https://stackoverflow.com/questions/67411792/angular-parent-form-with-child-form-component-how-to-let-child-know-when-parent
- https://stackoverflow.com/questions/72070748/failed-to-load-module-script-expected-a-javascript-module-script-but-the-server
- https://dev.to/stephenwhitmore/take-your-wordpress-site-farther-with-angular-3o6p
