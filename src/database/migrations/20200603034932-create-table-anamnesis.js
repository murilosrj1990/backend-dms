'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('anamnesis', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      alergies: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      blood_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hemophilic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      medication: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      weak_breath: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      fast_heartbeats: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      hiv_chagas_hepatitis: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      pregnant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      heart_disease: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      feet_hands_swelling: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      other_diseases: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

},

down: (queryInterface, Sequelize) => {
 
    return queryInterface.dropTable('anamnesis');

}
};
