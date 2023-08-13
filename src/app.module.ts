import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [VideosModule, AudioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
