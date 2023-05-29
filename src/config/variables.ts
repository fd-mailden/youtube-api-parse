import * as process from 'process';
import { ClientConfig } from 'pg';

require('dotenv').config();

export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
export const SPREAD_SHEET_ID = process.env.SPREAD_SHEET_ID;
export const SPREAD_SHEET_URL = process.env.SPREAD_SHEET_URL;

export const POSTGRES_CONNECTION: ClientConfig = {
  user: process.env.POSTGRES_CONNECTION_USER!,
  password: process.env.POSTGRES_CONNECTION_PASSWORD!,
  host: process.env.POSTGRES_CONNECTION_HOST!,
  port: parseInt(process.env.POSTGRES_CONNECTION_PORT!),
  database: process.env.POSTGRES_CONNECTION_DATABASE!,
  ssl: {
    rejectUnauthorized: false,
  },
};
