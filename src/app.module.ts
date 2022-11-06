import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RejectXmlApplicationTypeMiddleware } from './reject-xml-application-type/reject-xml-application-type.middleware';
import { ReposModule } from './repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RejectXmlApplicationTypeMiddleware).forRoutes('*');
  }
}
