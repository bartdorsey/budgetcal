import express from 'express';
const budgetRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware';
import { getBudgets, createBudget } from '../controllers/budgetController';

// GET /api/budgets
// Returns the budgets for the currently logged in user
budgetRouter.get('/', authRequired, getBudgets);

// POST /api/budgets
// Adds a new budget
budgetRouter.post('/', authRequired, createBudget);

export default budgetRouter;
