import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { UsersProviders } from "./user.providers";
import { DatabaseModule } from "../database.module";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [UsersResolver, UsersService, ...UsersProviders],
  exports: [UsersService]
})
export class UsersModule {
}
