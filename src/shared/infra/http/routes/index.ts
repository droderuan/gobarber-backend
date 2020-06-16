import { Router } from 'express';

import AppointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import ProvidersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/providers', ProvidersRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);

export default routes;
