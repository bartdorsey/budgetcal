import createController from "./createController.js";
import { Budget, budgetRepository } from '../repositories';

const budgetController = createController({
    async getBudgets({ session: { user } }, res) {
        const budgets = await user.$get('budgets');
        res.json(budgets);
    },
    async createBudget({ body }, res, {}) {
        const budget = await budgetRepository().insert<Budget>({
            name: body.name,
            amount: body.amount,
            color: body.color,
            icon: body.icon
        })
        res.json(budget);
    }
});

export const { getBudgets, createBudget } = budgetController;
export default budgetController;