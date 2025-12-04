import {Knex} from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const environments: string[] = ['development', 'staging', 'production'];

const connection: Knex.ConnectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const commonConfig: Knex.Config = {
  client: 'pg',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/database/migrations',
  },
  seeds: {
    directory: 'src/database/seeds',
  },
};

export default Object.fromEntries(environments.map((env: string) => [env, commonConfig]));
