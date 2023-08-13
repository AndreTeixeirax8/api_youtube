import { Controller,Get,Query, Res,Param,NotFoundException,
    Post,UploadedFile, UseInterceptors,Req  } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
import { AudioService } from './audio.service';
import ytdl from 'ytdl-core';
import { multerOptions } from './multer.config'; 
import { Mp4UploadMiddleware } from './mp4-upload-middleware';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import { Response } from 'express';
import * as fs from 'fs';


@Controller('audio')
export class AudioController {

    constructor(private readonly audioService: AudioService) {}

    @Get('download')
  async downloadAudio(@Query('url') url: string, @Res() res) {
    try {
      const audioReadableStream = await this.audioService.downloadAudio(url);

      const videoInfo = await ytdl.getInfo(url);

      res.set({
        'Content-Disposition': `attachment; filename="${videoInfo.videoDetails.title}.mp3"`,
        'Content-Type': 'audio/mpeg',
      });

      audioReadableStream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocorreu um erro ao baixar o áudio.');
    }
  }

}
