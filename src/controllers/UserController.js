const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

module.exports = {
    async index(req,res){
        const users = await User.findAll({
            attributes: ['name','email']
        });

        res.json(users);
    },

    async store(req,res){
        const { name , email , password } = req.body;

        const passwordEncrypted = bcrypt.hashSync(password,10);
        const user = await User.create({ name, email , password: passwordEncrypted });
        return res.json(user);
    },

    async authenticate(req,res){
        const { email , password } = req.body;
        console.log(email +" " +password);
        const user = await User.findOne({where: {email}});

        if(!user) return res.status(400).send({error: 'User not found'});

        if(!await bcrypt.compare(password, user.password)) return res.status(400).send({error: 'Invalid password'});
        user.password=undefined;

        const token = jwt.sign({id: user.id}, authConfig.secret,{
            expiresIn: 86400
        })
        res.send({user,token});
    }
}