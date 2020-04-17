module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'manufacturer', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('products', 'manufacturer');
  },
};
