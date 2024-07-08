import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAllCourse();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findCourseById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourseById(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.courseService.deleteCourseById(id);
  }
}
