import pool from '../config/db.js';

export const getUserById = async (userId) => {
  const query = `SELECT * FROM users WHERE user_id = $1`;
  const values = [userId];
  const res = await pool.query(query, values);
  return res.rows;
}

export const createUser = async (userId, username) => {
  const query = 'INSERT INTO users (user_id, username, money) VALUES ($1, $2, 500) RETURNING *';
  const values = [userId, username];
  const res = await pool.query(query, values);
  return res.rows[0];
}