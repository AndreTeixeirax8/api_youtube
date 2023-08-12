import { Controller, Get, Query, Res } from '@nestjs/common';
import * as ytdl from 'ytdl-core';

@Controller('videos')
export class VideosController {
  @Get('download')
  async downloadVideo(@Query('url') url: string, @Res() res) {
    try {
      const videoInfo = await ytdl.getInfo(url);
      const videoReadableStream = ytdl(url, { filter: 'audioandvideo' });

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
