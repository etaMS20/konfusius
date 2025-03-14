# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- developing v0

### Changed

- moved DOM sanitizer to Pipe

### Fixed

---

## Dev Notes

### Backend

- added [jwp plugin](https://de.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) to wp, [gitHub](https://github.com/Tmeister/wp-api-jwt-auth/)
- enabled PHP HTTP Authorization Header in .htaccess (lines 13 and 14)
- added JWT_AUTH_SECRET_KEY and JWT_AUTH_CORS_ENABLE=true to wp-config.php
- added Child of the current theme
- modified functions.php in child theme to support custom auth endpoint
- added CORS header to functions.php
- added allowed origin to backend to be able to save cookies from other origin

https://dev.to/stephenwhitmore/take-your-wordpress-site-farther-with-angular-3o6p

### TODO

- custom payment method (can have)
- custom endpoints to retrieve billing custom fields (must have)
- implement [fullscreen directive](https://medium.com/@milan.barac/angular-fullscreen-cd8b788c348f) (can have)
- fix product selection init (must have)
- implement caching (should have)
- implement Ui for "Digitale Anmeldeliste" (can have)
- extra login token for crew (must have)

  // https://stackoverflow.com/questions/67411792/angular-parent-form-with-child-form-component-how-to-let-child-know-when-parent
  // https://stackoverflow.com/questions/72070748/failed-to-load-module-script-expected-a-javascript-module-script-but-the-server
  // TODO: https://dev.to/stephenwhitmore/take-your-wordpress-site-farther-with-angular-3o6p
