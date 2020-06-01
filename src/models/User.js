const { Model , DataTypes } = require('sequelize');

class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            sequelize: connection
        })
    }
    
    static associate(models){
        this.hasMany(models.Budget, {foreignKey: 'user_id', as: 'budgets'});
    }

}

module.exports = User;