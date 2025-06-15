import multer from 'multer';

// 5 -> es el número máximo de archivos permitidos a la vez.
const upload = multer({ dest: 'uploads/' }).array('images', 5);

export default upload;