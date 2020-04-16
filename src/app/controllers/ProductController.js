import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      pn: Yup.string().required(),
      name: Yup.string().required(),
      descricao: Yup.string().required(),
      range: Yup.string().required(),
      tipo: Yup.string().required(),
      valor_unitario: Yup.number().required(),
      periodo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion Fails' });
    }

    const {
      id,
      pn,
      name,
      descricao,
      range,
      tipo,
      valor_unitario,
      periodo,
    } = await Product.create(req.body);

    return res.json({
      id,
      pn,
      name,
      descricao,
      range,
      tipo,
      valor_unitario,
      periodo,
    });
  }
}
export default new ProductController();
