# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- developing v0

### Changed

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

- custom payment method (plugin)
- custom endpoints to retrieve billing custom fields
- move DOM sanitizer to Service
- implement [fullscreen directive](https://medium.com/@milan.barac/angular-fullscreen-cd8b788c348f)
- fix product selection init
- implement caching
- implement Ui for "Digitale Anmeldeliste"
