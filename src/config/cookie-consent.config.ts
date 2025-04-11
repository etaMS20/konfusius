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
      background: '#4f46e5',
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
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{usedCookiesHref}}" target="_blank" rel="noopener">{{usedCookiesLink}}</a>. 
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{cookiePolicyHref}}" target="_blank" rel="noopener">{{cookiePolicyLink}}</a>. 
    </span>
    `,
  },
  content: {
    dismiss: 'Geht klar!',
    message:
      'Damit die Anmeldung auf dieser Seite funktioniert verwenden wir notwendige ',

    cookiePolicyLink: 'Datenschutzerklärung',
    cookiePolicyHref: 'https://konfusius.org/festival/#/privacy',
    usedCookiesLink: 'Cookies',
    usedCookiesHref:
      'https://woocommerce.com/document/woocommerce-cookies/#section-2',
  },
};
