export const environment = {
  app_version: require('../../package.json').version + '-dev',
  production: false,
  backendUrl: '/wp-json',
  consumerKey: import.meta.env['CONSUMER_KEY'],
  consumerSecret: import.meta.env['CONSUMER_SECRET'],
  password: import.meta.env['GUEST_PW'],
  crewPw: import.meta.env['CREW_PW'],
  salt: import.meta.env['SALT'],
  wp_secret: import.meta.env['WP_SECRET'],
  wp_user: 'angular_app',
};
