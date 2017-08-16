const db = require('./database')

const createReview = ( options ) => {
  return db.none(`
    INSERT INTO
      reviews (albums_id, review, users_id)
    VALUES
      ($1, $2, $3)
    `,[options.albums_id,
        options.review,
        options.users_id,
      ])
};

const getRecentReview = () => {
  return db.any(`SELECT a.artist, a.title, r.id, r.review,r.logged, u.username, u.email FROM albums a LEFT JOIN reviews r ON a.id = r.albums_id LEFT JOIN users u ON  r.users_id = u.id   ORDER BY logged  DESC  LIMIT 3`, [])
}

const getAllReviewByAlbumId = (albums_id) => {
  return db.any(
    `SELECT a.artist, a.title, r.id, r.review,r.logged, u.username, u.email FROM albums a LEFT JOIN reviews r ON a.id = r.albums_id LEFT JOIN users u ON  r.users_id = u.id  ORDER BY logged  DESC`
    , [albums_id])
}

const getAllReviewByUserId = (users_id) => {
  return db.any(`
      SELECT
        *
      FROM
        reviews
      WHERE
        users_id = $1
      ORDER BY
        logged
      DESC`, [users_id])
}

const deleteReveiwById = (reviews_id) => {
  return db.none(`
      SELECT
        *
      FROM
        reviews
      ORDER BY
        logged
      DESC
      WHERE
        reviews_id= $1
    `, [reviews_id])
}

module.exports = {
  createReview,
  getRecentReview,
  getAllReviewByUserId,
  getAllReviewByAlbumId,
  deleteReveiwById
}
