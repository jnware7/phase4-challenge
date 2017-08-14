const db = require('./database')

const getAllAlbum = () => {
  return db.many(`
      SELECT
        *
      FROM
        albums
    `, [])
}

module.exports= {getAllAlbum}
