import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: window.location.hostname, // it is mandatory to set a domain, for cookies to work properly
  },
  position: 'bottom',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
      link: '#ffffff',
    },
    button: {
      background: '#f9ae05',
      text: '#000000',
      border: '#f9ae05',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
  content: {
    message:
      'Diese Webseite nutzt Cookies lediglich um die Kern-Funktion von WooCommerce (dem Ticketing-Backend) zu ermöglichen - sonst nichts.',
    dismiss: 'Got it!',
    deny: 'Alle Cookies verbieten',
    link: 'Erfahre mehr über Cookies',
    href: 'https://cookiesandyou.com',
  },
};
