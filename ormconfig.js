const snakeCase = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = [
  {
    "name": "development",
    "type": "postgres",
    "url": "postgres://bryanmuller@localhost:5432/markt_dev",
    "synchronize": false,
    "logging": true,
    "entities": ["src/entity/**/*.ts"],
    "migrationsRun": true,
    "migrations": ["src/migration/**/*.ts"],
    "namingStrategy": new snakeCase(),
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  },
  {
    "name": "test",
    "type": "postgres",
    "url": "postgres://bryanmuller@localhost:5432/markt_test",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*.ts"],
    "namingStrategy": new snakeCase(),
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  }
];
