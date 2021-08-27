import createController from "./createController.js";

const userController = createController({
    async getUser(req, res, {}, {userRepository}) {
        const user = await userRepository.findOneOrFail(req.session.user.id);
        res.json(user);
    }
});

export const { getUser } = userController;
export default userController;