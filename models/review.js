import db from '../config/db';

const db = require('../config/db');

const createReviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      pr_id INTEGER NOT NULL,
      repo_name TEXT NOT NULL,
      feedback TEXT NOT NULL,
      score INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const saveReview = async (prId, repoName, feedback, score) => {
  const query = `
    INSERT INTO reviews (pr_id, repo_name, feedback, score)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [prId, repoName, feedback, score];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createReviewTable,
  saveReview,
};
