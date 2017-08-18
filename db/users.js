const db = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 12
const moment = require('moment')

const createUser = (username, password, email) => {
  return bcrypt.hash(password, saltRounds)
    .then(function (hash) {
      return db.one(`
        INSERT INTO
          users (username, password, email)
        VALUES($1, $2, $3)
        RETURNING *
        `, [username,
              hash,
              email])
    })
}

const getUserById = (id) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      id =$1
    `,[id])
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
const getUserByEmail = (email) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      email =$1
    `,[email])
}


module.exports = {
  createUser,
  getUserById,
  getUserProfileInfoById,
  getUserByEmail
}
