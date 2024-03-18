const { DataSource } = require('typeorm');
const path = require('path');

const options = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [path.join(__dirname, 'dist', '*.js')],
  migrations: [path.join(__dirname, 'dist', 'migrations', '*.js')],
};

module.exports = new DataSource(options);
