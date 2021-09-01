import User from "../models/User";

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const { id, nome, email } = novoUser;

      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //GET
  async get(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      res.status(200).json(users);
    } catch (error) {
      return res.json(null);
    };
  }

  //SHOW
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if(!user){
        return res.status(401).json('Usuário não existe');
      }
      const { id, nome, email } = user;
      res.status(200).json({ id, nome, email });
    } catch (error) {
      res.status(500).json({ message: error.message});
    };
  }

  //UPDATED_AT
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }
      const novosDados = await user.update(req.body);

      const { id, nome, email } = novosDados;
      res.status(200).json({id, nome, email});

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //DELETE
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }
      await user.destroy();
      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
