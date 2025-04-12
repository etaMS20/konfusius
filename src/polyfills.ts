// polyfills.ts

/**
 * Polyfills for Safari 16 compatibility with Angular 19 and Service Workers
 * Note: Some polyfills may already be included by Angular CLI based on your browserslist
 */

// Zone.js - Required by Angular (already included in Angular CLI projects)
import 'zone.js';

// Core-js polyfills for ES6+ features
import 'core-js/stable';
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-map';
import 'core-js/es/set';
import 'core-js/es/reflect';

// Web APIs and DOM polyfills
import 'whatwg-fetch'; // Fetch API polyfill
import 'intersection-observer'; // IntersectionObserver polyfill

// Service Worker specific polyfills
// Check if service worker is supported and add polyfill if needed
if (!('serviceWorker' in navigator)) {
  // Include a service worker polyfill - though most Safari 16 instances should support this
  console.warn('Service Worker API not natively supported');
}

// IndexedDB polyfill (Safari has had issues with IndexedDB in the past)
import 'idb'; // Lightweight IndexedDB wrapper

// Web Animations API for Angular animations
import 'web-animations-js';

// Ensure requestAnimationFrame is available
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
}

// For Safari bug fixes with ResizeObserver
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  import('resize-observer-polyfill').then((module) => {
    window.ResizeObserver = module.default;
  });
}

// Add URL polyfill for older browsers
import 'url-polyfill';

// Safari-specific touch events polyfill (if using touch features)
import 'pepjs';

// Intl API polyfill for internationalization (if needed)
if (!Intl.PluralRules) {
  import('@formatjs/intl-pluralrules/polyfill');
}

if (!Intl.RelativeTimeFormat) {
  import('@formatjs/intl-relativetimeformat/polyfill');
}

// Optional: Ensure Promise.prototype.finally is available
if (typeof Promise.prototype.finally === 'undefined') {
  // Utility function to mimic Promise.prototype.finally behavior
  function promiseFinally<T>(
    promise: Promise<T>,
    callback: () => void,
  ): Promise<T> {
    return promise.then(
      (value) =>
        Promise.resolve(
          typeof callback === 'function' ? callback() : undefined,
        ).then(() => value),
      (error) =>
        Promise.resolve(
          typeof callback === 'function' ? callback() : undefined,
        ).then(() => {
          throw error;
        }),
    );
  }
}
