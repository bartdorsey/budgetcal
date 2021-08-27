import createController from "./createController.js";


const budgetController = createController({
    async getBudgets({ session: { user } }, res) {
        const budgets = await user.$get('budgets');
        res.json(budgets);
    },
    async createBudget({ body }, res, {}, { budgetRepository }) {
        const budget = await budgetRepository.create({
            name: body.name,
            amount: body.amount,
            color: body.color,
            icon: body.icon
        })
        const result = budgetRepository.save(budget);
        res.json(result);
    }
});

export const { getBudgets, createBudget } = budgetController;
export default budgetController;