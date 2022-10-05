import { Field, ObjectType, ID, InputType, ArgsType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";

export const CommentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  uid: String,
  postId: String,
  comment: String,
  date_created: String
});


@ObjectType()
export class Comment extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  uid: string;

  @Field(type => User)
  writer: User;

  @Field(() => ID)
  postId: string;

  @Field(() => String)
  comment: string;

  @Field(() => String)
  date_created: string;
}

@ArgsType()
@InputType()
export class CommentInputType {
  @Field(() => ID)
  uid: string;

  @Field(() => ID)
  postId: string;

  @Field(() => String)
  comment: string;
}