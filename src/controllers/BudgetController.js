const Budget = require('../models/Budget');
const User = require('../models/User');

module.exports = {
    async index(req,res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: {association: 'budgets'}
        });

        res.json(user.budgets);
    },

    async store(req,res){
        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        if(!user) return res.json({message: 'User not found'});
        const date = new Date();
        date.setMonth( date.getMonth() + 1);
        
        const [date_s , hour_s] = date.toISOString().split('T');
        console.log(date.toISOString().split('T'));
        const valid_at = date_s +" "+hour_s.substr(0,12)+"+00";
        console.log(valid_at);
        const budget = await Budget.create({ valid_at , user_id});
        return res.json(budget);
    }

}