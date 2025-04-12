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
import 'whatwg-fetch';
import 'intersection-observer';
import 'web-animations-js'; // web Animations API for Angular animations
import 'idb';
import 'url-polyfill';
import 'pepjs';

if (!('serviceWorker' in navigator)) {
  console.warn('Service Worker API is not supported in this browser');
}

// Ensure requestAnimationFrame is available
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  import('resize-observer-polyfill').then((module) => {
    window.ResizeObserver = module.default;
  });
}

if (!Intl.PluralRules) {
  import('@formatjs/intl-pluralrules/polyfill');
}

if (!Intl.RelativeTimeFormat) {
  import('@formatjs/intl-relativetimeformat/polyfill');
}
