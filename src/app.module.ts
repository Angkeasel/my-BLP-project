import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ContentsModule } from './contents/contents.module';
import { IsUniqueConstraint } from './validation/isUnique.user.constrains';
import { CourseModule } from './course/course.module';
import { CommentModule } from './comment/comment.module';
import { LessonModule } from './lesson/lesson.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), DatabaseModule,
    AuthModule,
    UserModule,
    ContentsModule,
    CourseModule,
    CommentModule,
    LessonModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    IsUniqueConstraint]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
