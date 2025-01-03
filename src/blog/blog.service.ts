import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogsRepository.create(createBlogDto);
    return this.blogsRepository.save(blog);
  }

  findAll(): Promise<Blog[]> {
    return this.blogsRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.blogsRepository.findOneBy({ id });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    const updatedBlog = this.blogsRepository.merge(blog, updateBlogDto);
    return this.blogsRepository.save(updatedBlog);
  }

  async remove(id: string) {
    const result = await this.blogsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return result;
  }
}
