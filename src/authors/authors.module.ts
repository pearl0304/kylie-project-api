import { Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { PostsModule } from "../posts/posts.module";
import { AuthorsResolver } from "./authors.resolver";

@Module({
  imports: [PostsModule],
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {
}
