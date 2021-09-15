import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as dotenv from 'dotenv';

// import schema from './schemas';
import { schema } from './schemas/types'
import { DatabaseConfig } from './utils/config';

dotenv.config();

var app = express();

const db = DatabaseConfig.getInstance();
db.connect();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      // defaultquery
    }
  })
);
app.use('/', (_, res) => {
  res.redirect('/graphql');
});
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
