import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation, ID, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { Reply } from "../schemas/reply.schema";

@Resolver(() => Reply)
export class RepliesResolver {
}