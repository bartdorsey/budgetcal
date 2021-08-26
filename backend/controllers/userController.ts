import createController from "./createController.js";
import User from '../models/User.js';

const userController = createController({
    async getUser(req, res) {
        const user = await User.findByPk(req.session.user.id);
        res.json(user);
    }
});

export const { getUser } = userController;
export default userController;