import { Router } from 'express';

import AppointmentRouter from './appointments.routes';
import UsersRouter from './users.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
