import createController from "./createController.js";
import { User, userRepository } from '../repositories.js';

const userController = createController({
    async getUser(req, res, {}) {
        const user = await userRepository
            .where<User>('id', req.session.user.id)
            .limit(1);
        res.json(user);
    }
});

export const { getUser } = userController;
export default userController;