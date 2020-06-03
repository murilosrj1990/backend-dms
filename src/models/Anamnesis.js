const { Model , DataTypes } = require('sequelize');

class Anamnesis extends Model {
    static init(connection){
        super.init({
            alergies: DataTypes.BOOLEAN,
            blood_type: DataTypes.STRING,
            hemophilic: DataTypes.BOOLEAN,
            medication: DataTypes.BOOLEAN,
            weak_breath: DataTypes.BOOLEAN,
            fast_heartbeats: DataTypes.BOOLEAN,
            hiv_chagas_hepatitis: DataTypes.BOOLEAN,
            pregnant: DataTypes.BOOLEAN,
            heart_disease: DataTypes.BOOLEAN,
            feet_hands_swelling: DataTypes.BOOLEAN,
            other_diseases: DataTypes.BOOLEAN,
            comments: DataTypes.STRING
        },
        {
            sequelize: connection,
            tableName: 'anamnesis'
        })
    }
    static associate(models){
        this.belongsTo(models.User,{foreignKey: 'user_id', as: 'user'});
    }

}

module.exports = Anamnesis;