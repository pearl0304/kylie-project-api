import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation, ID, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { Comment, CommentInputType } from "../schemas/comment.schema";
import { CommentsService } from "./comments.service";
import { ApolloError } from "apollo-server-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user.decorator";
import { UsersService } from "../users/users.service";
import { User } from "../schemas/user.schema";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private commentService: CommentsService,
    private readonly userService: UsersService
  ) {
  }

  @Query(() => [Comment])
  async getComment(@Args("postId", { type: () => ID }) postId: string) {
    try {
      return await this.commentService.getComment(postId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  async createComment(@Args("input") input: CommentInputType) {
    try {
      return await this.commentService.createComment(input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  async deleteComment(
    @CurrentUser() user: User,
    @Args("id", { type: () => ID }) id: string) {
    try {
      return await this.commentService.deleteComment(user, id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async writer(@Parent() comment: Comment) {
    try {
      const { uid } = comment;
      return await this.userService.findUserById(uid);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}