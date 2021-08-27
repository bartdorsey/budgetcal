import createController from "./createController.js";

const budgetController = createController({
    async getBudgets({}, res) {
        const user = res.locals.user;
        const budgets = await user.budgets();
        res.json(budgets);
    },
    async createBudget({ body }, res, {}) {
        const user = res.locals.user;
        const budget = await user.budgets().insert({
            name: body.name,
            amount: body.amount,
            color: body.color,
            icon: body.icon
        });
        res.json(budget);
    }
});

export const { getBudgets, createBudget } = budgetController;
export default budgetController;