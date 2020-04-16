import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        company: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        insc_estadual: Sequelize.STRING,
        tel: Sequelize.STRING,
        cep: Sequelize.STRING,
        estado: Sequelize.STRING,
        bairro: Sequelize.STRING,
        rua: Sequelize.STRING,
        complemento: Sequelize.STRING,
        num_estabelecimento: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
