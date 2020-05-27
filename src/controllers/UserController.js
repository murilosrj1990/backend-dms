const User = require('../models/User');

module.exports = {
    async index(req,res){
        const users = await User.findAll();

        res.json(users);
    },

    async store(req,res){
        const { name , email , password } = req.body;
        const user = await User.create({ name, email , password });

        return res.json(user);
    }
}