import { Field, ID, ObjectType, ArgsType, InputType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";

export const PostSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  uid: String,
  title: String,
  photoURL: String,
  content: String,
  date_crated: String,
  date_updated: String,
  date_deleted: String,
  is_public: Boolean,
  deleted: Boolean
});

@ObjectType()
export class Post extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  uid: string;

  @Field(type => User)
  writer: User;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  photoURL?: string;

  @Field(() => String)
  content?: string;

  @Field(() => String, { nullable: true })
  date_crated?: string;

  @Field(() => String, { nullable: true })
  date_updated?: string;

  @Field(() => String, { nullable: true })
  date_deleted?: string;

  @Field(() => Boolean)
  is_public: boolean;

  @Field(() => Boolean)
  deleted: boolean;
}

@ArgsType()
@InputType()
export class PostInputType {
  @Field(() => ID)
  uid: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  photoURL?: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  is_public: boolean;
}