import { Connection } from "mongoose";
import { ReplySchema } from "../schemas/reply.schema";

export const RepliesProviders: any = [
  {
    provide: "POST_MODEL",
    useFactory: (connection: Connection) => connection.model("Replies", ReplySchema, "replies"),
    inject: ["DATABASE_CONNECTION"]
  }
];