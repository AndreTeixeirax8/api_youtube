import { Controller, Get, Query, Res } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) {}

    @Get('download')
    async downloadVideo(@Query('url') url: string, @Res() res) {
      try {
        const videoReadableStream = await this.videosService.downloadVideo(url);
  
        const videoInfo = await ytdl.getInfo(url);
  
        res.set({
          'Content-Disposition': `attachment; filename="${videoInfo.videoDetails.title}.mp4"`,
          'Content-Type': 'video/mp4',
        });
  
        videoReadableStream.pipe(res);
      } catch (error) {
        // Tratar erros aqui
        console.error(error);
        res.status(500).send('Ocorreu um erro ao baixar o vídeo.');
      }
    }


}
