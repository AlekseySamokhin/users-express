import dotenv from 'dotenv';
import fs from 'fs';

const defaultConfig = dotenv.parse(fs.readFileSync('default.env'));
const localConfig = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  postgresDb: {
    host: mainConfig.POSTGRES_DB_HOST,
    port: Number(mainConfig.POSTGRES_DB_PORT),
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: Boolean(mainConfig.POSTGRES_DB_LOGGING) === true,
  },

  server: {
    port: mainConfig.SERVER_PORT,
    endpoint: mainConfig.SERVER_ENDPOINTS_PREFIX,
  },

  jwt: {
    privateKey: mainConfig.TOKEN_SECRET,
    expiresIn: mainConfig.TOKEN_AUTH_EXPIRATION,
    type: mainConfig.TOKEN_TYPE,
  },

  password: {
    salt: mainConfig.PASSWORD_HASH_SALT,
  },
};

export default config;
