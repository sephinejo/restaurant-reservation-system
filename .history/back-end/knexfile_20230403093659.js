/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require('path');

const {
  DATABASE_URL = 'postgres://kvorwnnu:uk32oJg_1go5iiixA0_JVdZI1gL4hnd-@mouse.db.elephantsql.com/kvorwnnu',
  DATABASE_URL_DEVELOPMENT = 'postgres://pldagbbk:KxWaYiVsb9yb8TVZxXrHbH8Ox6X_MSDi@mouse.db.elephantsql.com/pldagbbk',
  DATABASE_URL_TEST = 'postgres://vrrejazw:TWRhmpY2Eq0ZwdgwYk22ZjO8mpgt7LZU@mouse.db.elephantsql.com/vrrejazw',
  DATABASE_URL_PREVIEW = 'postgres://fyhcemiv:NucROzsw96nGpM8L4r6s4xNWcQDVzTGD@mouse.db.elephantsql.com/fyhcemiv',
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
  test: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
  production: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
    debug: !!DEBUG,
  },
};
