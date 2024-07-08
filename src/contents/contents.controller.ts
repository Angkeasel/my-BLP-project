import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private contentsService: ContentsService) { }

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.createContent(createContentDto);
  }

  @Get()
  findAll() {
    return this.contentsService.findAllContents();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentsService.findContentById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.UpdateContentById(id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentsService.DeletedContentById(id);
  }
}
