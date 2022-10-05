import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 7001;

  const cspOptions = {
    directives: {
      // 헬멧 기본 옵션 가져오기
      ...helmet.contentSecurityPolicy.getDefaultDirectives(), // 기본 헬멧 설정 객체를 리턴하는 함수를 받아 전개 연산자로 삽입
      // 구글 API 도메인과 인라인 스크립트, eval 스크립트를 허용
      "script-src": ["'self'", "*.googleapis.com", "'unsafe-inline'", "'unsafe-eval'"],

      // 다음과 카카오에서 이미지 소스를 허용
      "img-src": ["'self'", "data:", "*.daumcdn.net", "*.kakaocdn.net"],

      // 소스에 https와 http 허용
      "base-uri": ["/", "http:"]
    }
  };
  app.use(helmet());
  app.use(helmet({
    contentSecurityPolicy: cspOptions
  }));


  await app.listen(PORT);
}

bootstrap();
