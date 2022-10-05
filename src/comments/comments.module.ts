import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { UsersModule } from "../users/users.module";
import { CommentsResolver } from "./comments.resolver";
import { DatabaseModule } from "../database.module";
import { CommentProviders } from "./comments.providers";

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [CommentsService, CommentsResolver, ...CommentProviders],
  exports: [CommentsService]
})
export class CommentsModule {
}
