import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @MinLength(3, {
    message: 'Title must be at least 3 characters',
  })
  title: string;

  @ApiProperty()
  @MinLength(3, {
    message: 'Description must be at least 3 characters',
  })
  description: string;

  @ApiProperty()
  @MinLength(3, {
    message: 'Subtitle must be at least 3 characters',
  })
  subtitle: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;
}
