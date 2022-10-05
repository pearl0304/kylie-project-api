import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as csurf from "csurf";
import * as cookieParser from "cookie-parser";
import { HttpExceptionFilter } from "./http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 7001;
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`));
}

bootstrap();
