import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation, ID, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { Comment, CommentInputType } from "../schemas/comment.schema";
import { CommentsService } from "./comments.service";
import { ApolloError } from "apollo-server-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user.decorator";
import { UsersService } from "../users/users.service";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private commentService: CommentsService) {
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
}