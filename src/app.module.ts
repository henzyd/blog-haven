import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ImagesController } from './images/images.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bh_db.sqlite',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
    BlogModule,
  ],
  controllers: [AppController, ImagesController],
  providers: [AppService],
})
export class AppModule {}
