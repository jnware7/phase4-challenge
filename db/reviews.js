const db = require('./database')

const createReview = ( review ) => {
  return db.none(`
    INSERT INTO
      reviews (albums_id, review, users_id, logged)
    VALUES
      ($1, $2, $3, $4)
    `,[review.albums_id,
        reveiw.review,
        review.users_id,
        review.logged
      ])
};

const getRecentReview = () => {
  return db.any(`
      SELECT
        *
      FROM
        reviews
      ORDER BY
        logged
      DESC
      LIMIT
        3
    `, [])
}
const getAllReviewByAlbum = (albums_id) => {
  return db.any(
    `SELECT a.artist, a.title, r.id, r.review,r.logged, u.username, u.email FROM albums a LEFT JOIN reviews r ON a.id = r.albums_id LEFT JOIN users u ON  r.users_id = u.id   WHERE review is not NULL LIMIT 3`
    , [albums_id])
}

const getAllReviewByUserId = (users_id) => {
  return db.any(`
      SELECT
        *
      FROM
        reviews
      ORDER BY
        logged
      DESC
      WHERE
        users_id = $1
    `, [users_id])
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
  deleteReveiwById
}
