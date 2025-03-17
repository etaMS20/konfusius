export const environment = {
  app_version: require('../../package.json').version,
  production: true,
  domain: 'etams20.github.io/konfusius',
  backendUrl: 'https://konfusius.org/wp-json',
  consumerKey: 'REPLACE_CONSUMER_KEY',
  consumerSecret: 'REPLACE_CONSUMER_SECRET',
  password: 'REPLACE_PASSWORD',
  crewPw: 'REPLACE_CREW',
  salt: 'REPLACE_SALT',
  wp_secret: process.env['WP_SECRET'],
  wp_user: 'angular_app',
};
