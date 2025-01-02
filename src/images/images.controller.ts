import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  @Get()
  getFile(id: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads', id));
    return new StreamableFile(file);
  }
}
