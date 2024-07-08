import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentEntity } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ContentsService {
  constructor(@InjectRepository(ContentEntity)
  private contentRepository: Repository<ContentEntity>) { }
  //====================> Post Contents <================================

  async createContent(createContentDto: CreateContentDto) {
    const newContent = this.contentRepository.create(createContentDto)
    return await this.contentRepository.save(newContent);
  }
  //====================> Get All Contents <================================
  async findAllContents() {
    try {
      const content = await this.contentRepository.find();
      if (!content || content.length === 0) {
        throw new HttpException('Not content Found', HttpStatus.NOT_FOUND);
      }
      return { status: HttpStatus.OK, message: 'Success', content }
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      if (e instanceof HttpException) {
        status = e.getStatus();
        const errorMessage = e.getResponse();
        message = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';
      }
      return { status, message, content: [] };
    }

  }
  //====================> Fetch Content By ID <================================
  async findContentById(id: number) {
    try {
      const content = await this.contentRepository.findOne({ where: { id } });
      if (!content) {
        throw new NotFoundException(`Content with ID ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'success', content };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  //====================> Update Content By ID <================================
  async UpdateContentById(id: number, updateContentDto: UpdateContentDto) {
    try {
      const content = await this.contentRepository.findOne({ where: { id } });
      if (!content) {
        throw new NotFoundException(`Content with ID ${id} not found!`);
      }
      const updateContent = await this.contentRepository.update(id, updateContentDto)
      return { status: HttpStatus.OK, message: ` Content with ID ${id} Updated Sucessfully`, updateContent }

    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }
  //====================> Deleted Content By ID <================================
  async DeletedContentById(id: number) {
    try {
      const content = await this.contentRepository.findOne({ where: { id } });
      if (!content) {
        throw new NotFoundException(`Content with ID ${id} not found!`);
      }
      const removeContent = await this.contentRepository.delete(id)
      return { status: HttpStatus.OK, message: ` Content with ID ${id} Deteled Sucessfully`, removeContent }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
