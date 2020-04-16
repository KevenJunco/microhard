import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        pn: Sequelize.STRING,
        name: Sequelize.STRING,
        descricao: Sequelize.STRING,
        range: Sequelize.STRING,
        tipo: Sequelize.STRING,
        periodo: Sequelize.STRING,
        valor_unitario: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Product;
