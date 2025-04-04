export const environment = {
  app_version: require('../../package.json').version,
  production: true,
  backendUrl: 'https://konfusius.org/wp-json',
  consumerKey: process.env['CONSUMER_KEY'],
  consumerSecret: process.env['CONSUMER_SECRET'],
  password: process.env['GUEST_PW'],
  crewPw: process.env['CREW_PW'],
  salt: process.env['SALT'],
  wp_secret: process.env['WP_SECRET'],
  wp_user: 'angular_app',
};
