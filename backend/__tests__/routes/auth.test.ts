import app from '../../app';
import request from 'supertest';

describe('/api/auth', () => {
    beforeAll(async() => {
    });

    afterAll(async() => {
    });
    describe('/api/auth/register', () => {
        it('registers a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@testuser.com',
                    password: 'pw',
                    confirmPassword: 'pw',
                });
            expect(response.statusCode).toEqual(200);
        });
    });
});
