import { Router } from 'express';
import { authRouter } from './auth.js';
import { workOrdersRouter } from './workOrders.js';
import { propertiesRouter } from './properties.js';
import { servicesRouter } from './services.js';
import { contactRouter } from './contact.js';

export const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/work-orders', workOrdersRouter);
apiRouter.use('/properties', propertiesRouter);
apiRouter.use('/services', servicesRouter);
apiRouter.use('/contact', contactRouter);
