import Dotenv from 'dotenv-webpack';

module.exports = {
  plugins: [new Dotenv()],
};

/**
 * @proxy
 * 
 * add this to angular.json under architect.serve
 * 
 * "options": {
      "proxyConfig": "proxy.conf.json"
    },
 * 
 */
