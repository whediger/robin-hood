require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/robin_hood'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
