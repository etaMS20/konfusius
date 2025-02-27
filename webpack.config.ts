import Dotenv from 'dotenv-webpack';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(__dirname, '.env');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
};

if (fs.existsSync(envPath)) {
  module.exports.plugins = [new Dotenv({ path: envPath })];
}
