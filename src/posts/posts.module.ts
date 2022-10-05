import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsResolver } from "./posts.reservler";
import { DatabaseModule } from "../database.module";
import { PostsProviders } from "./posts.providers";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [PostsService, PostsResolver, ...PostsProviders],
  exports: [PostsService]
})
export class PostsModule {
}
