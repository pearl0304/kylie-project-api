import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation, ID, Context } from "@nestjs/graphql";
import { User, UserInputType, LoginInputType, UserUpdateType } from "../schemas/user.schema";
import { UsersService } from "./users.service";
import { ApolloError } from "apollo-server-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {
  }

  @Query(() => [User])
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async findById(uid: string) {
    return await this.usersService.findById(uid);
  }

  @Mutation(() => User)
  async createUser(@Args("input") input: UserInputType) {
    try {
      return await this.usersService.createUser(input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => User)
  async login(@Args("input") input: LoginInputType) {
    try {
      return await this.usersService.login(input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() user: User,
    @Args("uid", { type: () => ID }) uid: string,
    @Args("input") input: UserUpdateType) {
    try {
      return await this.usersService.updateUser(user, uid, input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}