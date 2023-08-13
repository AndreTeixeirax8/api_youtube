import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';

@Injectable()
export class AudioService {
    async downloadAudio(url: string): Promise<Readable> {
        const audioReadableStream = ytdl(url, { filter: 'audioonly' });
        return audioReadableStream;
      }


      async extractAudio(videoPath: string): Promise<string> {
        const outputPath = path.join(__dirname, 'audio', `${Date.now()}.mp3`);
    
        return new Promise((resolve, reject) => {
          ffmpeg(videoPath)
            .output(outputPath)
            .noVideo()
            .audioCodec('libmp3lame')
            .on('end', () => resolve(outputPath))
            .on('error', (error) => reject(error))
            .run();
        });
      }
}
