import { Connection } from "mongoose";
import { CommentSchema } from "../schemas/comment.schema";

export const CommentProviders: any = [
  {
    provide: "COMMENT_MODEL",
    useFactory: (connection: Connection) => connection.model("Comment", CommentSchema, "comments"),
    inject: ["DATABASE_CONNECTION"]
  }
];