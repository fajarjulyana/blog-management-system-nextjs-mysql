// models/database.ts

import { Sequelize } from 'sequelize';

// Configure the Sequelize instance
const sequelize = new Sequelize('blog_management_dev', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // Disable logging; default: console.log
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
});

// Test the connection (optional)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
