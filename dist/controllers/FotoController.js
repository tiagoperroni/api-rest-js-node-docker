"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerconfig = require('../config/multer.config'); var _multerconfig2 = _interopRequireDefault(_multerconfig);

var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerconfig2.default).single('foto');
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
      const foto = await _Foto2.default.create({ originalname, filename, aluno_id});

      return res.status(200).json(foto);
    } catch (error) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        });
    }
   });
  }
}

exports. default = new FotoController();