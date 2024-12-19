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

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { image, ...data } = createBlogDto;

    const blog = this.blogsRepository.create({ ...data, image: image.path });
    return await this.blogsRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogsRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.blogsRepository.findOneBy({ id });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogsRepository.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    const { image, ...data } = updateBlogDto;
    return this.blogsRepository.update(id, { ...data, image: image?.path });
  }

  async remove(id: string) {
    const result = await this.blogsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return result;
  }
}
