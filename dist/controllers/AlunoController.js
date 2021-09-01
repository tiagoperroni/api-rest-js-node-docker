"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async get(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: [
        "id", "nome", "sobrenome", "email", "idade", "peso", "altura",
      ],
      order: [
        ["id", "DESC"],
        [_Foto2.default, "id", "DESC"],
      ],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename', 'originalname'],
      },
    });
    res.json(alunos);
  }

  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          "id", "nome", "sobrenome", "email", "idade", "peso", "altura",
        ],
        order: [
          ["id", "DESC"],
          [_Foto2.default, "id", "DESC"],
        ],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename', 'originalname'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não existe"],
        });
      }

      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não existe"],
        });
      }

      const newAluno = await aluno.update(req.body);

      return res.status(200).json(newAluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não existe"],
        });
      }
      await aluno.destroy();
      return res.status(200).json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();
