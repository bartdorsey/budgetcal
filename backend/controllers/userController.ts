import createController from "./createController.js";
import User from '../models/User';

const userController = createController({
    async getUser(req, res, {}) {
        const user = await User.query()
            .withGraphJoined('budgets')
            .where('users.id', req.params.id)
            .first();
        res.json(user.safe());
    }
});

export const { getUser } = userController;
export default userController;