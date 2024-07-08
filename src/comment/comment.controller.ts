import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAllComments();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findCommentById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateCommentById(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.deleteCommentById(id);
  }
}
