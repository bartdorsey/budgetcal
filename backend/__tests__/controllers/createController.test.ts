import createController from "../../controllers/createController";
import httpMocks from 'node-mocks-http';

describe('createController', () => {
    it('wraps the controller', async () => {
        const { req, res } = httpMocks.createMocks();
        const next = jest.fn();
        const mockController = {
            mockControllerFunction: () => {
                return 1;
            }
        }
        const wrappedController = createController(mockController);
        expect(await wrappedController.mockControllerFunction(req, res, next)).toEqual(1);
    })
    it('calls next with the error', async () => {
        const { req, res } = httpMocks.createMocks();
        const next = jest.fn();
        const error = new Error();
        const mockController = {
            mockControllerFunction: jest.fn(({}={}, {}={}, next) => {
                next(error);
            })
        }
        const wrappedController = createController(mockController);
        await wrappedController.mockControllerFunction(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
    });
});