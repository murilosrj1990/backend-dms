const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

module.exports = {
    async index(req,res){
        const users = await User.findAll({});
        users.password=undefined;
        res.json(users);
    },

    async store(req,res){
        const { name , email ,phone, password } = req.body;

        const passwordEncrypted = bcrypt.hashSync(password,10);
        const user = await User.create({ name, email, phone , password: passwordEncrypted });
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
    },

    async delete(req,res){
        const { user_id } = req.params;
        const deleted_lines_number = await User.destroy({where: {id: user_id}});
        if (deleted_lines_number === 1){
            return res.status(200).json({message: 'User deleted.'});
        }else{
            return res.status(404).json({message: 'User not found.'})
        }
        
    }
}