/* eslint-disable no-console */
import dotenv from 'dotenv';
import fs from 'fs';

const defaultConfig = dotenv.parse(fs.readFileSync('default.env'));
const localConfig = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...defaultConfig,
  ...localConfig,
};

// Get data from the .env and default.env files.
const config = {
  postgresDb: {
    host: mainConfig.POSTGRES_DB_HOST,
    port: Number(defaultConfig.POSTGRES_DB_PORT),
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: Boolean(mainConfig.POSTGRES_DB_LOGGING) === true,
  },

  server: {
    // port: defaultConfig.CURRENT_URL,
    port: 4000,
  },
};

export default config;
