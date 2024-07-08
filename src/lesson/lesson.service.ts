import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonEntity) private lessonRepositoty: Repository<LessonEntity>) { }

  async createLesson(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepositoty.create(createLessonDto);
    return await this.lessonRepositoty.save(lesson)
  }

  async findAllLessons() {
    try {
      const lesson = await this.lessonRepositoty.find();
      if (!lesson || lesson.length === 0) {
        throw new HttpException('Not lesson Found', HttpStatus.NOT_FOUND);
      }
      return { status: HttpStatus.OK, message: 'Success', lesson }
    } catch (err) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      if (err instanceof HttpException) {
        status = err.getStatus();
        const errorMessage = err.getResponse();
        message = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';
      }
      return { status, message, lesson: [] };
    }
  }

  async findLessonById(id: number) {
    try {
      const lesson = await this.lessonRepositoty.findOne({ where: { id } });
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} is not found`)
      }
      return { status: HttpStatus.OK, message: 'success', lesson }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateLessonById(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this.lessonRepositoty.findOne({ where: { id } });
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} is not found`)
      }
      const updateLesson = await this.lessonRepositoty.update(id, updateLessonDto)
      return { status: HttpStatus.OK, message: ` Lesson with ID ${id} Updated Sucessfully`, updateLesson }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletedLessonById(id: number) {
    try {
      const lesson = await this.lessonRepositoty.findOne({ where: { id } });
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} is not found`)
      }
      const deleteLesson = await this.lessonRepositoty.delete(id)
      return { status: HttpStatus.OK, message: ` Lesson with ID ${id} Deleted Sucessfully`, deleteLesson }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}