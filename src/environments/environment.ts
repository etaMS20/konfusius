export const environment = {
  production: false,
  backendUrl: 'https://konfusius.org/wp-json',
  consumerKey: process.env['CONSUMER_KEY'],
  consumerSecret: process.env['CONSUMER_SECRET'],
  credentials: { password: process.env['PW'], salt: process.env['SALT'] },
};
