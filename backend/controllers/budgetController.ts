import createController from "./createController";
import Budget from "../models/Budget";

const budgetController = createController({
    async getBudgets({ session: { user } }, res) {
        const budgets = await user.$get('budgets');
        res.json(budgets);
    },
    async createBudget({ body, session: { user } }, res) {
        const budget = await Budget.create({
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