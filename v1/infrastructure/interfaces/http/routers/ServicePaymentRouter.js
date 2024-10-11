
import express from 'express';


import { PaymentRepository } from '../../../adapters/Services/PaymentRepository.js';

import { ServicesPaymentController } from '../../../adapters/controllers/ServicesPaymentController.js';

export const servicesPaymentRouter = express.Router();

const servicesRepository = new PaymentRepository();
const servicesController = new ServicesPaymentController(servicesRepository);

// Definir la ruta POST /clients
servicesPaymentRouter.post('/payment', (req, res) => servicesController.createPayment(req , res));



