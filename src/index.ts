import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request } from 'express';
import fs from 'fs';
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
import path from 'path';
import { context } from './context';
import { istInKiste } from './resolvers/gegenstand';
import { gegenstaendeInKiste } from './resolvers/kiste';
import {
  addGegenstand,
  addKiste,
  deleteGegenstand,
  deleteKiste,
  updateGegenstand,
  updateKiste,
} from './resolvers/mutation';
import {
  alleGegenstaende,
  alleKisten,
  gegenstandById,
  kisteById,
} from './resolvers/query';
import { getJWT } from './utils';

// loading enviroment variables
dotenv.config();

// resolvers
const resolvers = {
  Query: { alleGegenstaende, alleKisten, kisteById, gegenstandById },
  Mutation: {
    addGegenstand,
    addKiste,
    deleteGegenstand,
    deleteKiste,
    updateGegenstand,
    updateKiste,
  },
  Gegenstand: { istInKiste },
  Kiste: { gegenstaendeInKiste },
  DateTime: DateTimeResolver,
};

// type defs
const typeDefs = [
  fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8'),
  DateTimeTypeDefinition,
];

startApolloServer();

// server start function
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: { req: Request }) => {
      return {
        ...req,
        prisma: context.prisma,
        jwt: getJWT(req),
      };
    },
    introspection: true,
  });
  await server.start();

  const app = express();

  // enable the use of request body parsing middleware
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT }, () => resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
  return { server, app };
}
