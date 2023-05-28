import { POSTGRES_CONNECTION } from '../config/variables';

const { Pool } = require('pg');

class _AccountsFetchService {
  private pool = new Pool(POSTGRES_CONNECTION);

  async getYouTubeAccounts() {
    try {
      const query = `
                SELECT a.*
                FROM "test_task_data"."accounts" AS a
                         JOIN "test_task_data"."sources" AS s ON a."_source_id" = s."_id"
                WHERE a."_platform" = 'YouTube'
            `;
      const res = await this.pool.query(query);
      return res.rows;
    } catch (error) {
      console.error('Error executing query', error);
      return [];
    }
  }
}

export const AccountsFetchService = new _AccountsFetchService();
