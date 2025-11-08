import pool from "../config/db.js";

export const postArtwork = async (userId, artworkUrl) => {
    const query = 'INSERT INTO artworks (user_id, url) VALUES ($1, $2) RETURNING *';
    const values = [userId, artworkUrl];
    const res = await pool.query(query, values);
    return res.rows[0];
}

