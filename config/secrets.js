require('dotenv').config();

module.exports = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  PORT: process.env.PORT,
  DB_ENV: process.env.DB_ENV || null,
};
