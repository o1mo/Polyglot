module.exports = {
  test: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'lango_test'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'lango'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'lango',
      database: 'lango',
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
