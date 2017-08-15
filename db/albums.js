const db = require('./database')

const getAllAlbums = () => {
  return db.many(`
      SELECT
        *
      FROM
        albums
    `, [])
}
const getAlbumById = (albums_id) => {
  return db.one(`
      SELECT
        *
      FROM
        albums
      WHERE
        id= $1
    `, [albums_id])
}

module.exports= {
  getAllAlbums,
  getAlbumById
}
