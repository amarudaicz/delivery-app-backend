import multer, { Multer } from 'multer';
import path from 'path';

// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log();
    cb(null, './dist/uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
}); 

const upload = multer({ storage: storage });
export default upload;

// logFolderStructure.js
import fs from 'fs';


function logRootFolders(rootPath:any) {
  const items = fs.readdirSync(rootPath);

  const folders = items.filter(item => {
    const itemPath = path.join(rootPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`Root Folders for ${rootPath}:`);
  console.log(folders.join('\n'));
}

const rootFolder = path.resolve('./dist'); // Ruta absoluta de la carpeta raíz del script
logRootFolders(rootFolder);