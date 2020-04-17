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

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'img_id', as: 'img' });
  }
}
export default Product;
