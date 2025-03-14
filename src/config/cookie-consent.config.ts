import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: window.location.hostname, // it is mandatory to set a domain, for cookies to work properly
  },
  position: 'bottom-left',
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
  theme: 'classic',
  type: 'opt-out',
  content: {
    message:
      'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
  },
};
