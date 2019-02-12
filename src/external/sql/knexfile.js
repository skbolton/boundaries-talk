module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "sprint_planner_dev",
      user: "postgres",
      password: "postgres"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "sprint_planner_migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
  test: {
    client: "postgresql",
    connection: {
      database: "sprint_planner_test",
      user: "postgres",
      password: "postgres"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "sprint_planner_migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
}
