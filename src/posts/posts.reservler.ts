import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation, ID, Context } from "@nestjs/graphql";
import { User } from "../schemas/user.schema";
import { Post, PostInputType } from "../schemas/post.schema";
import { PostsService } from "./posts.service";
import { ApolloError } from "apollo-server-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user.decorator";
import { type } from "os";

@Resolver()
export class PostsResolver {
  constructor(
    private postsService: PostsService
  ) {
  }

  @Query(() => [Post])
  async findAllPosts() {
    try {
      return await this.postsService.findAllPosts();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Post)
  async findPost(
    @Args("id", { type: () => ID }) id: string) {
    try {
      return await this.postsService.findPost(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() user: User,
    @Args("input") input: PostInputType
  ) {
    try {
      return await this.postsService.createPost(user, input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @CurrentUser() user: User,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") input: PostInputType
  ) {
    try {
      return await this.postsService.updatePost(user, id, input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  // 포스터 삭제
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async deletePost(
    @CurrentUser()user: User,
    @Args("id", { type: () => ID }) id: string
  ) {
    try {
      return await this.postsService.deletePost(user, id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}