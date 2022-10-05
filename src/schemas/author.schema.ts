import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "./post.schema";


@ObjectType()
export class Author {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(type => [Post], { nullable: "items" })
  posts: Post[];
}