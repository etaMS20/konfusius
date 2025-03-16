import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: window.location.hostname, // it is mandatory to set a domain, for cookies to work properly
  },
  position: 'bottom-right',
  palette: {
    popup: {
      background: '#fff',
    },
    button: {
      background: '#f1d600',
    },
  },
  theme: 'edgeless',
  type: 'info',
  layout: 'custom-layout',
  layouts: {
    'custom-layout': '{{messagelink}}{{compliance}}',
  },
  elements: {
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}} 
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank" rel="noopener">{{cookiePolicyLink}}</a>. 
    </span>
    `,
  },
  content: {
    dismiss: 'Geht klar!',
    message:
      'Diese Webseite nutzt Cookies um die Kern-Funktion von WooCommerce (unserem Ticketing-Backend) zu ermöglichen. Mehr dazu ',

    cookiePolicyLink: 'hier',
    cookiePolicyHref: 'https://cookie.com',
  },
};
