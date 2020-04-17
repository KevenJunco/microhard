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

    const productExists = await Product.findOne({ where: { pn: req.body.pn } });

    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
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

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      descricao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validadtion Fails' });
    }

    const product = await Product.findByPk(req.productId);

    const { id, name, descricao } = await product.update(req.body);

    console.log(req.productId);

    return res.json({
      id,
      name,
      descricao,
    });
  }
}
export default new ProductController();
