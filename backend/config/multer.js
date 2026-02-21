import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We need to go up one level from 'config' to 'backend' root, then to 'public/assets'
// __dirname is now .../backend/config
// We want .../backend/public/assets
const assetsPath = path.join(__dirname, '..', 'public', 'assets');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, assetsPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
});
