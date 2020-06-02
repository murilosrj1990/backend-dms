const { Model , DataTypes } = require('sequelize');

class Budget extends Model {
    static init(connection){
        super.init({
            valid_at: DataTypes.DATE
        },
        {
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.User,{foreignKey: 'user_id', as: 'user'});
        this.hasMany(models.Procedure,{foreignKey: 'budget_id' , as: "procedures"});
    }

}

module.exports = Budget;