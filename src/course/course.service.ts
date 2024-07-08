import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CourseService {
  constructor(@InjectRepository(CourseEntity)
  private courseRepository: Repository<CourseEntity>) { }

  async createCourse(createCourseDto: CreateCourseDto) {
    const newCourse = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(newCourse);
  }

  async findAllCourse() {
    try {
      const course = await this.courseRepository.find();
      if (!course || course.length === 0) {
        throw new HttpException('Not course Found', HttpStatus.NOT_FOUND);
      }
      return { status: HttpStatus.OK, message: 'Success', course }
    } catch (err) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      if (err instanceof HttpException) {
        status = err.getStatus();
        const errorMessage = err.getResponse();
        message = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';
      }
      return { status, message, course: [] };
    }
  }

  async findCourseById(id: number) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} is not found`)
      }
      return { status: HttpStatus.OK, message: 'success', course }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCourseById(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} is not found`)
      }
      const updateCourse = await this.courseRepository.update(id, updateCourseDto)
      return { status: HttpStatus.OK, message: ` Course with ID ${id} Updated Sucessfully`, updateCourse }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCourseById(id: number) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} is not found`)
      }
      const deleteCourse = await this.courseRepository.delete(id)
      return { status: HttpStatus.OK, message: ` Course with ID ${id} Deleted Sucessfully`, deleteCourse }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
