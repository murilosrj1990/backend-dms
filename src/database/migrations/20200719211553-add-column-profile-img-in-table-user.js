'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'profile_img',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }

    )
  },

  down: (queryInterface, Sequelize) => {
    
    
      return queryInterface.removeColumn('users', 'profile_img');
   
  }
};
