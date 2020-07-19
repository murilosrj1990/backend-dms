const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const {Storage} = require('@google-cloud/storage');

const path = require('path')
const serviceKey = path.join(__dirname, '../../google-storage-key.json');

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
        if(!user_id) return res.status(400).json({message: 'User ID not provided.'});
        const deleted_lines_number = await User.destroy({where: {id: user_id}});
        if (deleted_lines_number === 1){
            return res.status(200).json({message: 'User deleted.'});
        }else{
            return res.status(404).json({message: 'User not found.'});
        }
        
    },
    async edit(req,res){
        const {user_id} = req.params;
        if(!user_id) return res.status(400).json({message: 'User ID not provided.'});
        const { name , phone , email } = req.body;
        if( !name || !phone || !email ) return res.status(400).json({message: "User information missing."});
        const user = await User.findByPk(user_id);
        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();
        return res.status(200).json({message: "User updated."});
    },
    async upload(req,res,next){

        const { user_id } = req.params;
        console.log(req.file);
        const file = req.file;
        const {buffer} = file;
        
        const gcs = new Storage({
            projectId: 'ambient-climate-255916',
            keyFilename: serviceKey
        });
        const bucket = gcs.bucket('profile-img-dms');



        new Promise(async (resolve, reject) => {
            
            const user = await User.findByPk(user_id);
            const blob = bucket.file('profile-'+user_id+'.png');
            const blobStream = blob.createWriteStream({
              resumable: false
            })
            blobStream.on('finish', async () => {
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
              user.profile_img=publicUrl
                await user.save();
              resolve(
                    
                  res.status(200).json({
                      message: "File uploaded",
                      publicUrl
                  })
              )
            })
            .on('error', () => {
              reject(`Unable to upload image, something went wrong`)
            })
            .end(buffer)
          })
    }
}