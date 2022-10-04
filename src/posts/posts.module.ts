import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsResolver } from "./posts.reservler";
import { DatabaseModule } from "../database.module";
import { PostsProviders } from "./posts.providers";

@Module({
  imports: [DatabaseModule],
  providers: [PostsService, PostsResolver, ...PostsProviders],
  exports: [PostsService]
})
export class PostsModule {
}
