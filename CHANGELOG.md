# Changelog

All notable changes to this project will be documented in this file.

## [1.0.x]

### Added

- caching/service-workers `ngsw`
- wp plugin to backend with endpoints to validate `invited_by` field
- extra login token for crew
- version indication in footer
- ng service-worker
- `wp ftp` ci deployment workflow
- loading indication for tickets page
- cross-sale products mat-radio
- disclaimer component
- encryption to order redirect page
- localStorage service
- conditions in checkout component
- disclaimer order meta
- fullscreen to image slider
- FAQ page, shared status and dialog component
- in-stock identifier on ticket page
- Image gallery page
- `destroy$` to subscriptions were applicable
- crew-page
- table of orders with filters and actions
- shared status component
- cookie consent and privacy page

### Changed

- moved DOM sanitizer to Pipe
- moved DateTime human readable to Pipe
- order overview
- state behavior in ticket component
- changed html tag of nav buttons to `<a>`
- styling of nav
- replaced imports with `@` notation were applicable
- fetch privacy page content instead of hardcode

### Fixed

- refactored tickets page
- styling on mobile (v1)
- loading indicator for products
- lifecycle binding in checkout component
- `ngsw` hash mismatch errors in production
- payment method not always showing on checkout overview

### Removed

- unused services and redundant code
- non-generic dialog components

---
