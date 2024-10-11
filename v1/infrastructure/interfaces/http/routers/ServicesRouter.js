
import express from 'express';

import { MessageRepository } from '../../../adapters/Services/MessageRepository.js';

import { ServicesController } from '../../../adapters/controllers/ServicesController.js';

export const servicesRouter = express.Router();

const servicesRepository = new MessageRepository();
const servicesController = new ServicesController(servicesRepository);

// Definir la ruta POST /clients
servicesRouter.post("/send-sms", (req, res) => servicesController.sendMessage(req, res));



