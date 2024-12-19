import { IsOptional, MinLength } from 'class-validator';

export class CreateBlogDto {
  @MinLength(3, {
    message: 'Title must be at least 3 characters',
  })
  title: string;

  @MinLength(3, {
    message: 'Description must be at least 3 characters',
  })
  description: string;

  @MinLength(3, {
    message: 'Subtitle must be at least 3 characters',
  })
  subtitle: string;

  @IsOptional()
  image?: Express.Multer.File;
}
