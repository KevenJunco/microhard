import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().max(32).required(),
      last_name: Yup.string().max(32).required(),
      company: Yup.string().max(32).required(),
      email: Yup.string().email().max(50).required(),
      password: Yup.string().min(6).required(),
      cnpj: Yup.string().required().min(14).max(14),
      insc_estadual: Yup.string().min(9).max(9),
      tel: Yup.string().max(32).required(),
      cep: Yup.string().min(8).max(8).required(),
      estado: Yup.string().max(2).required(),
      bairro: Yup.string().max(32).required(),
      rua: Yup.string().max(32).required(),
      complemento: Yup.string().max(50),
      num_estabelecimento: Yup.string(8),
      provider: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion Fails' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const {
      id,
      name,
      last_name,
      company,
      email,
      cnpj,
      insc_estadual,
      tel,
      cep,
      estado,
      bairro,
      rua,
      complemento,
      num_estabelecimento,
      provider,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      last_name,
      company,
      email,
      provider,
      cnpj,
      insc_estadual,
      tel,
      cep,
      estado,
      bairro,
      rua,
      complemento,
      num_estabelecimento,
    });
  }

  // tested
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion Fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    console.log(req.userId);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
