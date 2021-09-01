import multer from 'multer';
import multerConfig from '../config/multer.config';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');
class FotoController {
   post(req, res) {
   return upload(req, res, async (error) => {
    if(error){
      return res.status(400).json({
        errors: [error.code],
      });
    }

    try {
      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;
      const foto = await Foto.create({ originalname, filename, aluno_id});

      return res.status(200).json(foto);
    } catch (error) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        });
    }
   });
  }
}

export default new FotoController();