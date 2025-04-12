export const environment = {
  app_version: require('../../package.json').version,
  production: true,
  backendUrl: 'https://konfusius.org/wp-json',
  consumerKey: process.env['NG_APP_CONSUMER_KEY'],
  consumerSecret: process.env['NG_APP_CONSUMER_SECRET'],
  password: process.env['NG_APP_GUEST_PW'],
  crewPw: process.env['NG_APP_CREW_PW'],
  salt: process.env['NG_APP_SALT'],
  wp_secret: process.env['NG_APP_WP_SECRET'],
  wp_user: 'angular_app',
};
