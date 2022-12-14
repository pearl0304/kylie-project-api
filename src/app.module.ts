import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from './comments/comments.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
      context: ({ req, connection }) => {
        if (req) {
          const user = req.headers.authorization;
          return { ...req, user };
        } else {
          return connection;
        }
      }
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    RepliesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
