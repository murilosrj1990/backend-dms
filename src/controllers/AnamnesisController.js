const Anamnesis = require('../models/Anamnesis');
const User = require('../models/User');


module.exports = {
    async index  (req,res){
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: 'anamnesis'
        });
        user.password = undefined;
        res.status(200).json(user.anamnesis);
    },
    async store(req,res){
        const { user_id } = req.params;
        const { alergies, blood_type, hemophilic, medication, weak_breath, fast_heartbeats, hiv_chagas_hepatitis, pregnant, heart_disease, feet_hands_swelling, other_diseases, comments} = req.body;
        console.log (req.body);
        //if(!alergies || !blood_type || !hemophilic || !medication || !weak_breath || !fast_heartbeats || !hiv_chagas_hepatitis || !pregnant || !heart_disease || !feet_hands_swelling || !other_diseases || !comments) return res.status(400).json({message: 'Anamnesis informtion missing.'});

        const user = await User.findByPk(user_id);
        if(!user) return res.status(400).json({message: 'User not found.'});
        const anamnesis = await Anamnesis.create({user_id , alergies , blood_type , hemophilic , medication , weak_breath , fast_heartbeats , hiv_chagas_hepatitis , pregnant , heart_disease , feet_hands_swelling , other_diseases , comments});
        res.status(200).json(anamnesis);
    }
}
