import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as dotenv from 'dotenv';

import schema from './schemas';
import defaultQuery from './utils/default.query';
import { DatabaseConfig } from './utils';

dotenv.config();

var app = express();

const db = DatabaseConfig.getInstance();
db.connect();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery
    }
  })
);
app.use('/', (_, res) => {
  res.redirect('/graphql');
});
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
