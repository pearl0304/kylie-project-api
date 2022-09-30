import { Injectable, Inject } from "@nestjs/common";
import { User, UserInputType, LoginInputType, UserUpdateType } from "../schemas/user.schema";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";
import * as bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-express";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_MODEL")
    private readonly userModel: Model<User>,
    private readonly authService: AuthService
  ) {
  }

  // FUNCTION
  private async checkDisplayName(displayName: string): Promise<Boolean> {
    try {
      let result = false;
      const is_duplicate = await this.userModel.findOne({ displayName: displayName }).exec();
      if (is_duplicate) result = true;

      return result;
    } catch (e) {
      throw e;
    }
  }

  private async checkPassword(password1: string, password2: string): Promise<Boolean> {
    try {
      let result = false;
      if (password1 === password2) result = true;
      return result;
    } catch (e) {
      throw e;
    }
  }

  // RESOLVE
  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return this.userModel.findOne({ email: email }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return this.userModel.findById({ _id: id }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }


  async createUser(input: UserInputType) {
    try {
      // CHECK USER INFORMATION
      const is_duplicate = await this.checkDisplayName(input.displayName);
      const saltRounds = 10;
      if (is_duplicate) throw new ApolloError("This nickname is in use");
      const check_password = await this.checkPassword(input.password1, input.password2);
      if (!check_password) throw new ApolloError("Please check password");
      const password = input.password1;
      delete input.password1;
      delete input.password2;


      // CREATE DATA
      const data = {
        ...input,
        password: await bcrypt.hash(password, saltRounds),
        date_crated: new Date()
      };

      const result = await this.userModel.create(data);
      return {
        uid: result._id,
        ...data
      };

    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async login(input: LoginInputType) {
    try {
      const user = await this.authService.validateUser(
        input.email,
        input.password
      );

      if (!user) {
        throw new ApolloError(`Email or password are invalid`);
      } else {
        const access_token = await this.authService.generateUserCredentials(user);
        user.access_token = access_token.access_token;

        return user;
      }
      return null;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async updateUser(user: User, uid: string, input: UserUpdateType) {
    try {
      if (user.uid !== uid) throw new ApolloError("You don't have to access.");
      const check_user = await this.userModel.findById({ _id: uid }).exec();
      if (!check_user) throw new ApolloError("There are no user information.");


    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
