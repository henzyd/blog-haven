import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  private readonly uploadPath = join(process.cwd(), 'uploads');

  @Get(':id')
  @Header('Content-Type', 'image/*')
  getFile(@Param('id') id: string): StreamableFile {
    const filePath = join(this.uploadPath, id);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Image not found');
    }

    return new StreamableFile(createReadStream(filePath));
  }
}
