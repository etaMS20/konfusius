// polyfills.ts for Safari/IOS 16 and lower compatibility

import 'zone.js';

// core-js (for ES6+ features)
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

import 'whatwg-fetch'; // web APIs and DOM
import 'intersection-observer'; // polyfills native IntersectionObserver API
import 'web-animations-js'; // web animations API for Angular animations
import 'idb'; // lightweight IndexedDB wrapper
import 'pepjs'; // safari-specific touch events

// ensure requestAnimationFrame is available
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
