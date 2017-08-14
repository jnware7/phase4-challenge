const db = require('./database')

const createUser = (user) => {
  return db.none(`
    INSERT INTO
      users (username, password, email, user_image, logged)
    VALUES
      ($!, $2, $3, $4, $5)
    `,[user.username,
        user.password,
        user.email,
        user.user_image,
        user.logged])
}
const getUserById = (users_id) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      users_id =$1
    `,[users_id])
}
const getUserProfileInfoById = (users_id) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      users_id =$1
    `,[users_id])
}
const getUserProfileInfoById = (username) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      username =$1
    `,[username])
}


module.exports = {
  createUser,
  getUserById,
  getUserProfileInfoById,
  getUserByUserName
}
