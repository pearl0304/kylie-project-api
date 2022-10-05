import { Query, Resolver, Args, Mutation, ID, Parent, Int, ResolveField, Subscription } from "@nestjs/graphql";
import { AuthorsService } from "./authors.service";
import { PostsService } from "../posts/posts.service";
import { Author } from "../schemas/author.schema";
import { PubSub } from "graphql-subscriptions";


@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {
  }

  @Query(returns => Author)
  async author(@Args("id", { type: () => String }) id: string) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findPost(id);
  }
}