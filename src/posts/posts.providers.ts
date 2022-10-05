import { Connection } from "mongoose";
import { PostSchema } from "../schemas/post.schema";

export const PostsProviders: any = [
  {
    provide: "POST_MODEL",
    useFactory: (connection: Connection) => connection.model("Posts", PostSchema, "posts"),
    inject: ["DATABASE_CONNECTION"]
  }
];