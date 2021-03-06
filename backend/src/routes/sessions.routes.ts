import { Router } from 'express';

import AthenticateUserService from '../services/AthenticateUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

        const { email, password }  = request.body;

        const authenticateUser = new AthenticateUserService();

        const { user, token }  =  await authenticateUser.execute({
            email, password,
        });

        delete user.password;

        return response.json( { user, token });

});
export default sessionsRouter;
