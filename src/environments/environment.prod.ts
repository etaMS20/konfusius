export const environment = {
  production: true,
  domain: 'konfusius.org',
  backendUrl: 'https://konfusius.org/wp-json',
  consumerKey: process.env['CONSUMER_KEY'],
  consumerSecret: process.env['CONSUMER_SECRET'],
  password: process.env['GUEST_PW'],
  crewPw: process.env['CREW_PW'],
  salt: process.env['SALT'],
};
