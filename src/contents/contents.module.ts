import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule { }
