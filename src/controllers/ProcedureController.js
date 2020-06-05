const Procedure = require('../models/Procedure');
const Budget = require('../models/Budget');

module.exports = {
    async index(req, res) {
        const { budget_id } = req.params;
        const budget = await Budget.findByPk(budget_id, {
            include: {association: 'procedures'}
        });
        if (!budget) return res.status(404).json({ message: "Budget not found." });
        return res.status(200).json(budget.procedures);
    },

    async store(req, res) {

        const { budget_id } = req.params;
        if (!budget_id) return res.status(404).json({ message: "BUDGET_ID not provided." });
        const budget = await Budget.findByPk(budget_id);
        if (!budget) return res.status(404).json({ message: "Budget not found." });
        const { name, tooth_number, price, category } = req.body;
        const procedure = await Procedure.create({ name, tooth_number, price, category, budget_id });
        return res.status(200).json(procedure);
    },
    async delete(req,res){
        const { procedure_id } = req.params;
        if(!procedure_id) return res.status(400).json({message: 'PROCEDURE_id not provided.'});
        const procedure = await Procedure.findByPk(procedure_id);
        if (procedure){
            await procedure.destroy();
            return res.status(200).json({message: 'Procedure deleted.'});
        }else{
            return res.status(404).json({message: 'Procedure not found.'});
        }
    }
}