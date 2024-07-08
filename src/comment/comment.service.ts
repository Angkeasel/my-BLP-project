import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, commentText } = createCommentDto;
    const condition: FindOptionsWhere<CommentEntity> | FindOptionsWhere<CommentEntity>[] = {
      ...(userId ? { userId } : {}),
    }

    const user = await this.userRepository.findOne({ where: condition })
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newComment = new CommentEntity();
    newComment.commentText = commentText;
    newComment.user = user;
    return await this.commentRepository.save(newComment)
  }

  async findAllComments() {
    try {
      const comment = await this.commentRepository.find();
      if (!comment || comment.length === 0) {
        throw new HttpException('Not comment Found', HttpStatus.NOT_FOUND);
      }
      return { status: HttpStatus.OK, message: 'Success', comment }
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      if (e instanceof HttpException) {
        status = e.getStatus();
        const errorMessage = e.getResponse();
        message = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';
      }
      return { status, message, comment: [] };

    }

  }

  async findCommentById(id: number) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'success', comment };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCommentById(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      const updateComment = await this.commentRepository.update(id, updateCommentDto)
      return { status: HttpStatus.OK, message: ` Content with ID ${id} Updated Sucessfully`, updateComment }

    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCommentById(id: number) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      const deletedComment = await this.commentRepository.delete(id)
      return { status: HttpStatus.OK, message: ` Comment with ID ${id} Deleted Sucessfully`, deletedComment }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
