import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs'
fs.mkdir('/subidas', null , ()=>{})
// Configurar Multer
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
      const uploadDirectory = path.resolve(__dirname, './uploads');
      console.log(uploadDirectory);
      
    cb(null, uploadDirectory); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

const uploadDirectory = path.resolve(__dirname, './uploads');
console.log(uploadDirectory);

const upload = multer({ storage: storage });
export default upload;