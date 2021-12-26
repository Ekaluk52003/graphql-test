"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tq = __importStar(require("type-graphql"));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const PostResolver_1 = require("./PostResolver");
const UserResolver_1 = require("./UserResolver");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_scalars_1 = require("graphql-scalars");
const context_1 = require("./context");
const graphql_1 = require("graphql");
const apollo_server_core_1 = require("apollo-server-core");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    tq.registerEnumType(PostResolver_1.SortOrder, {
        name: 'SortOrder',
    });
    const schema = yield tq.buildSchema({
        resolvers: [PostResolver_1.PostResolver, UserResolver_1.UserResolver, PostResolver_1.PostCreateInput],
        scalarsMap: [{ type: graphql_1.GraphQLScalarType, scalar: graphql_scalars_1.DateTimeResolver }],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema,
        context: context_1.context,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()
        ],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: '/api'
    });
    httpServer.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server listening on http://localhost:4000${apolloServer.graphqlPath}`));
});
startServer();
