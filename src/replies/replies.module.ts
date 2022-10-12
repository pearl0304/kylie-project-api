import { Module } from "@nestjs/common";
import { UsersModule} from "../users/users.module";
import { DatabaseModule } from "../database.module";
import { RepliesService } from "./replies.service";
import { RepliesProviders } from "./replies.providers";
import { RepliesResolver } from "./replies.resolver";

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [RepliesService, RepliesResolver, ...RepliesProviders],
  exports: []
})
export class RepliesModule {
}
