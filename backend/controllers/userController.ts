import createController from "./createController";
import User from '../models/User';

const userController = createController({
    async getUser(req, res, next) {
        const user = await User.findByPk(req.session.user.id);
        res.json(user);
    }
});

export const { getUser } = userController;
export default userController;