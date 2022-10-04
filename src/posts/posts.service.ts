import { Injectable, Inject } from "@nestjs/common";
import { Post, PostInputType } from "../schemas/post.schema";
import { Model } from "mongoose";
import { ApolloError } from "apollo-server-express";
import * as moment from "moment-timezone";
import { User } from "../schemas/user.schema";

@Injectable()
export class PostsService {
  constructor(
    @Inject("POST_MODEL")
    private readonly postModel: Model<Post>
  ) {
  }

  async findAllPosts(): Promise<Post[]> {
    try {
      return this.postModel.find().exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findPost(id: string): Promise<Post | undefined> {
    try {
      const proc = await this.postModel.findOne({ _id: id, deleted: false }).exec();
      if (proc === null) throw new ApolloError("This post was deleted");

      proc.id = proc._id;

      return proc;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async createPost(user: User, input: PostInputType) {
    try {
      // CHECK USER
      if (user.uid !== input.uid) throw new ApolloError("You don't have to access.");

      const data = {
        ...input,
        date_crated: moment().local().format(),
        deleted: false
      };

      const result = await this.postModel.create(data);

      return {
        id: result._id,
        ...data
      };
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async updatePost(user: User, id: string, input: PostInputType) {
    try {
      // CHECK USER
      const proc = await this.postModel.findOne({ _id: id, deleted: false }).exec();
      if (proc === null) throw new ApolloError("Please check");
      if (user.uid !== proc.uid) throw new ApolloError("You don't have to access.");

      const data = {
        ...input,
        date_updated: moment().local().format()
      };

      await this.postModel.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

      return {
        id: id,
        ...data
      };
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async deletePost(user: User, id: string) {
    try {
      const proc = await this.postModel.find({ _id: id, deleted: false }).exec();
      if (!proc) throw new ApolloError("Please check");
      if (user.uid !== proc[0].uid) throw new ApolloError("You don't have to access.");

      const data = {
        is_public: false,
        deleted: true,
        date_deleted: moment().local().format()
      };

      await this.postModel.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

      return { id: id };

    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
