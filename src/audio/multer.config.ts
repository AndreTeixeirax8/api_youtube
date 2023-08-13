import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // O diretório onde os arquivos serão salvos
    filename: (req, file, callback) => {
      const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
