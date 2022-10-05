import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";

@Injectable()
export class AuthorsService {
  async findOneById(id: string) {
    try {

    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
