import 'reflect-metadata'
import * as tq from 'type-graphql'
import { createServer } from "http";
import express from "express";
import { PostCreateInput, PostResolver, SortOrder } from './PostResolver'
import { UserResolver } from './UserResolver'
import { ApolloServer } from "apollo-server-express";
import { DateTimeResolver } from 'graphql-scalars'
import { context } from './context'
import { GraphQLScalarType } from 'graphql'
import {
	ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";

const startServer  = async () => {

  const app = express()
  const httpServer = createServer(app)

  tq.registerEnumType(SortOrder, {
    name: 'SortOrder',
  })

  const schema = await tq.buildSchema({
    resolvers: [PostResolver, UserResolver, PostCreateInput],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  })

  const apolloServer = new ApolloServer({ schema,
    context: context,
    plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground()
		],

  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/api'
})
httpServer.listen({ port: process.env.PORT || 4000 }, () =>
console.log(`Server listening on http://localhost:4000${apolloServer.graphqlPath}`)
)
}

startServer()
