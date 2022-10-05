import { Injectable, Inject } from "@nestjs/common";
import { Comment, CommentInputType } from "../schemas/comment.schema";
import { Model } from "mongoose";
import * as moment from "moment-timezone";
import { ApolloError } from "apollo-server-express";


@Injectable()
export class CommentsService {
  constructor(
    @Inject("COMMENT_MODEL")
    private readonly userModel: Model<Comment>
  ) {
  }

  async createComment(input: CommentInputType): Promise<Comment | undefined> {
    try {
      const data = {
        ...input,
        date_created: moment().local().format()
      };
      const result = await this.userModel.create(data);
      result.id = result._id;

      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
