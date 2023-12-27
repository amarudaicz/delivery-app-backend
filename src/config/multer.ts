import multer, { Multer } from 'multer';
import path from 'path';

// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log();
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });
export default upload;

// logFolderStructure.js
import fs from 'fs';

function logFolderStructure(folderPath:any, indent = 0) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file:any) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`${' '.repeat(indent)}[${file}] (Folder)`);
      logFolderStructure(filePath, indent + 2); // Recursivamente, para carpetas
    } else {
      console.log(`${' '.repeat(indent)}${file} (File)`);
    }
  });
}

const rootFolder = path.resolve(__dirname); // Ruta absoluta de la carpeta raíz del script
console.log(`Folder Structure for ${rootFolder}:`);
logFolderStructure(rootFolder);
