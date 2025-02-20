# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Initial setup for the project.
- Integration with WordPress backend.
- Environment configuration for development and production.
- Shift component with selection functionality.
- Shift details component with dynamic content and animations.
- Proxy configuration for local development.
- WP Api Client dep

### Changed

- Switched from npm to pnpm for dependency management.
- Updated environment configuration to use `.env` file for local development.
- switched to custom-webpack builder to load env on runtime

### Fixed

- Resolved issues with environment variable loading in Angular.
- wrong type for store endpoint

---

## dev notes

### Backend

- added [jwp plugin](https://de.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) to wp, [gitHub](https://github.com/Tmeister/wp-api-jwt-auth/)
- enabled PHP HTTP Authorization Header in .htaccess (lines 13 and 14)
- added JWT_AUTH_SECRET_KEY and JWT_AUTH_CORS_ENABLE=true to wp-config.php
- added Child of the current theme
- modified functions.php in child theme to support custom auth endpoint
- added CORS header to functions.php
