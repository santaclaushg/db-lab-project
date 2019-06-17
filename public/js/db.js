import pg from 'pg';
import dotenv from 'dotenv'

dotenv.config();
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'project_dblab',
  password: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
}
export const pool = new pg.Pool(config);
export default {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}