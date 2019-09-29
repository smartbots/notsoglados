import Knex from 'knex';

export const DB = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
    afterCreate: (conn, done) => {
      conn.query("SET timezone='UTC';", (err) => {
        if (err) {
          done(err, conn);
        } else {
          done(err, conn);
        }
      });
    },
  },
});
