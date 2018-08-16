module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'wtfs_dev',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'wtfs_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
}
