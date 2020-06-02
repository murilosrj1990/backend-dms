const { Model , DataTypes } = require('sequelize');

class Procedure extends Model {
    static init(connection){
        super.init({
            tooth_number: DataTypes.INTEGER,
            name: DataTypes.STRING,
            category: DataTypes.STRING,
            price: DataTypes.DOUBLE
        },
        {
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.Budget,{foreignKey: 'budget_id', as: 'budget'});
    }

}

module.exports = Procedure;