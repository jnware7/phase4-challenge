const db = require('./database')

const getAllAlbums = () => {
  return db.many(`
      SELECT
        *
      FROM
        albums
    `, [])
}

module.exports= {getAllAlbums}
