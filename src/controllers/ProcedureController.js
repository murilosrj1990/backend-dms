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
        const budget = await Budget.findByPk(budget_id);
        if (!budget) return res.status(404).json({ message: "Budget not found." });
        const { name, tooth_number, price, category } = req.body;
        const procedure = await Procedure.create({ name, tooth_number, price, category, budget_id });
        return res.status(200).json(procedure);
    }
}