import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as ytdl from 'ytdl-core';

@Injectable()
export class VideosService {
    async downloadVideo(url: string): Promise<Readable> {
        const videoReadableStream = ytdl(url, { filter: 'audioandvideo' });
        return videoReadableStream;
      }

    
}
