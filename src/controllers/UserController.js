const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

module.exports = {
    async index(req,res){
        const users = await User.findAll({attributes: ['id','name','email','phone']});
        res.json(users);
    },

    async store(req,res){
        try{
            const { name , email ,phone, password } = req.body;
            if(!name || !email || !phone || !password) return res.status(400).json({message: 'User information missing.'});
            const passwordEncrypted = bcrypt.hashSync(password,10);
            const user = await User.create({ name, email, phone , password: passwordEncrypted });
            user.password = undefined;
            return res.status(200).json(user);
        }catch(err){
            return res.status(500).json({message: 'Error processing request.'});
        }
        
    },

    async authenticate(req,res){
        const { email , password } = req.body;
        if(!email) return res.status(400).json({message: 'Email not provided.'});
        if(!password) return res.status(400).json({message: 'Password not provided.'});

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
        if(!user_id) return res.status(400).json({message: 'User ID not provided.'})
        const deleted_lines_number = await User.destroy({where: {id: user_id}});
        if (deleted_lines_number === 1){
            return res.status(200).json({message: 'User deleted.'});
        }else{
            return res.status(404).json({message: 'User not found.'});
        }
        
    }
}