import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: window.location.hostname, // it is mandatory to set a domain, for cookies to work properly
  },
  position: 'bottom-right',
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
  type: 'info',
  content: {
    message:
      'Diese Webseite nutzt Cookies um die Kern-Funktion von WooCommerce (unserem Ticketing-Backend) zu ermöglichen.',
    dismiss: 'Geht klar!',
    deny: 'Alle Cookies verbieten',
    link: 'Mehr dazu hier',
    href: 'https://cookiesandyou.com',
  },
};
