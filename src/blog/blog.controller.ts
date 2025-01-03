import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  private getImageUrl(request: Request, file: Express.Multer.File): string {
    return `${request.protocol}://${request.get('host')}/images/${file.filename}`;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    if (file) {
      createBlogDto.image = this.getImageUrl(request, file);
    }
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    if (file) {
      updateBlogDto.image = this.getImageUrl(request, file);
    }
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.blogService.remove(id);
    return 'Blog deleted';
  }
}
