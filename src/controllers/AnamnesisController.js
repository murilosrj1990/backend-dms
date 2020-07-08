const Anamnesis = require('../models/Anamnesis');
const User = require('../models/User');


module.exports = {
    async get  (req,res){
        const { anamnesis_id } = req.params;
        const anamnese = await Anamnesis.findByPk(anamnesis_id);
        res.status(200).json(anamnese);
    },
    async index  (req,res){
        const { user_id } = req.params;
        const anamnesis = await Anamnesis.findAndCountAll({
            attributes: ['id', 'createdAt'], 
            where: {user_id},
            limit: 10,
            offset: 0
        });
        res.status(200).json(anamnesis);
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
    },
    async edit(req,res){
        const {anamnesis_id} = req.params;
        if(!anamnesis_id) return res.status(400).json({message: 'ANAMNESIS_ID not provided.'});
        console.log(anamnesis_id);
        const { alergies, blood_type, hemophilic, medication, weak_breath, fast_heartbeats, hiv_chagas_hepatitis, pregnant, heart_disease, feet_hands_swelling, other_diseases, comments} = req.body;
        
        const anamnesis = await Anamnesis.findByPk(anamnesis_id);
        console.log(anamnesis);
        if(!anamnesis) return res.status(400).json({message: 'Anamnesis not found.'});
        anamnesis.alergies=alergies;
        anamnesis.blood_type=blood_type;
        anamnesis.hemophilic=hemophilic;
        anamnesis.medication=medication;
        anamnesis.weak_breath=weak_breath;
        anamnesis.fast_heartbeats=fast_heartbeats;
        anamnesis.hiv_chagas_hepatitis=hiv_chagas_hepatitis;
        anamnesis.pregnant=pregnant;
        anamnesis.heart_disease=heart_disease;
        anamnesis.feet_hands_swelling=feet_hands_swelling;
        anamnesis.other_diseases=other_diseases;
        anamnesis.comments=comments;
        await anamnesis.save();
        return res.status(200).json({message: "Anamnesis updated."});
    }
}
