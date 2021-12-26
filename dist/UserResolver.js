"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./Post");
const User_1 = require("./User");
const PostResolver_1 = require("./PostResolver");
let UserUniqueInput = class UserUniqueInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserUniqueInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserUniqueInput.prototype, "email", void 0);
UserUniqueInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserUniqueInput);
let UserCreateInput = class UserCreateInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreateInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserCreateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [PostResolver_1.PostCreateInput], { nullable: true }),
    __metadata("design:type", Array)
], UserCreateInput.prototype, "posts", void 0);
UserCreateInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserCreateInput);
let UserResolver = class UserResolver {
    posts(user, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.prisma.user
                .findUnique({
                where: {
                    id: user.id,
                },
            })
                .posts();
        });
    }
    signupUser(data, ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const postData = (_a = data.posts) === null || _a === void 0 ? void 0 : _a.map((post) => {
                return { title: post.title, content: post.content || undefined };
            });
            return ctx.prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    posts: {
                        create: postData,
                    },
                },
            });
        });
    }
    allUsers(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.prisma.user.findMany();
        });
    }
    draftsByUser(userUniqueInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.prisma.user
                .findUnique({
                where: {
                    id: userUniqueInput.id || undefined,
                    email: userUniqueInput.email || undefined,
                },
            })
                .posts({
                where: {
                    published: false,
                },
            });
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserCreateInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signupUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "allUsers", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => [Post_1.Post], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('userUniqueInput')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserUniqueInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "draftsByUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
