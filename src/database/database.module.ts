import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    // entities: [UserEntity, ContentEntity, CourseEntity, CommentEntity, LessonEntity],
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true, // Be cautious about using synchronize in production
                };
            },
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {

}
