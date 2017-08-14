const db = require('./database')

// const newReview = ( options ) => {
//   return db.one(`
//     INSERT INTO
//       reviews (city, tip, city_image, thumbs, users_id)
//     VALUES
//       ($1, $2, $3, $4, $5)
//     RETURNING
//       *
//     `, [options.city,
//          options.tip,
//          options.city_image,
//          options.thumbs,
//          options.users_id
//        ])
// };

const createReview = ( ) => {
  return db.none(`
    INSERT INTO
      reviews ()
    `)
}
