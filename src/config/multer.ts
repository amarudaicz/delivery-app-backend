import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs'

// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadDirectory = path.resolve('./src/uploads');
    cb(null, uploadDirectory); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });
export default upload;