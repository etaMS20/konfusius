export const environment = {
  app_version: require('../../package.json').version + '-dev',
  production: false,
  backendUrl: '/wp-json',
  consumerKey: import.meta.env['NG_APP_CONSUMER_KEY'],
  consumerSecret: import.meta.env['NG_APP_CONSUMER_SECRET'],
  password: import.meta.env['NG_APP_GUEST_PW'],
  crewPw: import.meta.env['NG_APP_CREW_PW'],
  salt: import.meta.env['NG_APP_SALT'],
  wp_secret: import.meta.env['NG_APP_WP_SECRET'],
  wp_user: 'angular_app',
};
