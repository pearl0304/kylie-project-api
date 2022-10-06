import { Injectable, Inject } from "@nestjs/common";
import { Comment, CommentInputType } from "../schemas/comment.schema";
import { Model } from "mongoose";
import * as moment from "moment-timezone";
import { ApolloError } from "apollo-server-express";
import { User } from "../schemas/user.schema";


@Injectable()
export class CommentsService {
  constructor(
    @Inject("COMMENT_MODEL")
    private readonly commentModel: Model<Comment>
  ) {
  }

  async getComment(postId: string) {
    try {
      const proc = await this.commentModel.find({ postID: postId }).sort({ "date_created": -1 });
      const result = proc.map((item) => {
        return {
          id: item._id,
          uid: item.uid,
          postId: item.postId,
          comment: item.comment,
          date_created: item.date_created
        };
      });
      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }


  async createComment(input: CommentInputType): Promise<Comment | undefined> {
    try {
      const data = {
        ...input,
        date_created: moment().local().format()
      };
      const result = await this.commentModel.create(data);
      result.id = result._id;

      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async deleteComment(user: User, id: string) {
    try {
      const proc = await this.commentModel.findById(id);
      if (!proc) throw new ApolloError("The comment is not exist");
      if (user.uid !== proc.uid) throw new ApolloError("You don't have to access");

      await this.commentModel.deleteOne({ _id: id });
      return { id: id };
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
