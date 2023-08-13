// mp4-upload.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

@Injectable()
export class Mp4UploadMiddleware implements NestMiddleware {
  private upload = multer({ dest: 'uploads/' }).single('file');

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err: any) => {
      if (err) {
        return res.status(500).json({ message: 'Erro no upload do arquivo.' });
      }
      next();
    });
  }
}
