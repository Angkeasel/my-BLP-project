import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonService.findAllLessons();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lessonService.findLessonById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.updateLessonById(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lessonService.deletedLessonById(id);
  }
}
